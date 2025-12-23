// API URL - should be in an environment variable in a real app
const API_URL = 'http://localhost:3000/api';

// For debugging
console.log('API utility using URL:', API_URL);

// Get the auth token from localStorage
const getToken = () => localStorage.getItem('auth_token');

// Generic fetch function with authentication
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  // Handle 401 Unauthorized globally
  if (response.status === 401) {
    // Clear auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Redirect to login page
    window.location.href = '/';
    throw new Error('Your session has expired. Please log in again.');
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
}

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  },
  
  signup: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phone?: string;
  }) => {
    return fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then(res => res.json());
  },
  
  getProfile: async () => {
    return fetchWithAuth('/auth/profile');
  },
};

// Export the fetchWithAuth function for other API modules
export { fetchWithAuth };