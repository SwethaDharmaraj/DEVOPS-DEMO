import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the user type
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

// API URL - should be in an environment variable in a real app
const API_URL = 'http://localhost:3000/api';

// For debugging
console.log('AuthContext using API URL:', API_URL);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUserData = localStorage.getItem('user_data');
      
      if (storedToken && storedUserData) {
        try {
          // Validate token with the server
          const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (response.ok) {
            // Token is valid
            setToken(storedToken);
            setUser(JSON.parse(storedUserData));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        } catch (error) {
          console.error('Auth validation error:', error);
          // On error, assume token is invalid
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (email: string, password: string, newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
  };

  // Compute isAuthenticated
  const isAuthenticated = !!token && !!user;

  // Context value
  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);