// API utility - handles both development and production URLs
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const getApiUrl = (path: string = '') => {
  // Remove leading slash if present, add it back consistently
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash from API_URL if present
  const baseUrl = API_URL.replace(/\/$/, '');
  return `${baseUrl}${cleanPath}`;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentHustlerId');
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
};

export default getApiUrl;

