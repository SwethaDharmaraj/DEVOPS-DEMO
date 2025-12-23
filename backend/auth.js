import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS with specific options
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:8081",
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Handle preflight requests
app.options('*', cors());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// JWT Secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || "makemytrip_jwt_secret";

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/makemytrip", {
  // Connection options are handled automatically in newer mongoose versions
})
.then(() => console.log("Connected to MongoDB database 'makemytrip'"))
.catch(err => console.error("MongoDB connection error:", err));

// Enhanced User schema with additional fields
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true
  },
  lastName: { 
    type: String,
    trim: true
  },
  phone: { 
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: { 
    type: Date 
  }
});

const User = mongoose.model("User", userSchema);

// Validation helpers
function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Generate JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  console.log("Signup request body:", req.body);

  const { email, password, firstName, lastName, phone } = req.body;

  // Validation
  if (!email || !password || !firstName) {
    return res.status(400).json({ error: "Email, password, and first name are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
  if (!isValidPassword(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      email, 
      password: hashedPassword,
      firstName,
      lastName,
      phone
    });
    
    await user.save();

    console.log("User saved to DB:", user._id);
    res.status(201).json({ 
      message: "Signup successful",
      userId: user._id
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  console.log("Login request received");

  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Return user info (excluding password)
    const userInfo = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    
    res.json({ 
      message: "Login successful",
      token,
      user: userInfo
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user profile (protected route)
app.get("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
