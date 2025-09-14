/**
 * Unified API Configuration
 * 
 * This module provides centralized configuration for API endpoints
 * and handles different environments (development, Docker, production)
 */

// Get the API URL from environment or construct it
export function getApiUrl(): string {
  // For production on Railway, always use relative URLs (goes through nginx proxy)
  // Check multiple conditions to ensure we're in production
  if (import.meta.env.PROD || 
      window.location.hostname.includes('railway.app') ||
      window.location.hostname !== 'localhost') {
    return '';
  }

  // Check if VITE_API_URL is provided (set by docker-compose)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // For local development only
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  // Use configured port or default to 8181
  const port = import.meta.env.VITE_ARCHON_SERVER_PORT || '8181';
  
  console.info('[Archon] Development mode - Using ARCHON_SERVER_PORT:', port);
  
  return `${protocol}//${host}:${port}`;
}

// Get the base path for API endpoints
export function getApiBasePath(): string {
  const apiUrl = getApiUrl();
  
  // If using relative URLs (empty string), just return /api
  if (!apiUrl) {
    return '/api';
  }
  
  // Otherwise, append /api to the base URL
  return `${apiUrl}/api`;
}

// Export commonly used values
export const API_BASE_URL = '/api';  // Always use relative URL for API calls
export const API_FULL_URL = getApiUrl();
