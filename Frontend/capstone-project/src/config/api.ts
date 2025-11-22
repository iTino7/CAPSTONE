// Use proxy in production (Vercel) to avoid CORS issues, or use direct API URL
const getApiUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production on Vercel, use proxy to avoid CORS
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Check if we're on Vercel (or any production domain)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return '/api'; // Use Vercel proxy
    }
  }
  
  // Default to localhost for development
  return 'http://localhost:3002';
};

export const API_URL = getApiUrl();

