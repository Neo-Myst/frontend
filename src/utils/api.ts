const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const makeRequest = async (
  endpoint: string,
  method: string = 'GET',
  body: any = null,
  requiresAuth: boolean = false
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    // Handle 401 Unauthorized specifically
    if (response.status === 401) {
      // Clear authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      // You might want to redirect to login page or trigger a context update
      throw new Error('Authentication expired');
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

// Helper methods for common operations
export const get = (endpoint: string, requiresAuth: boolean = false) => 
  makeRequest(endpoint, 'GET', null, requiresAuth);

export const post = (endpoint: string, data: any, requiresAuth: boolean = false) => 
  makeRequest(endpoint, 'POST', data, requiresAuth);

export const put = (endpoint: string, data: any, requiresAuth: boolean = false) => 
  makeRequest(endpoint, 'PUT', data, requiresAuth);

export const del = (endpoint: string, requiresAuth: boolean = false) => 
  makeRequest(endpoint, 'DELETE', null, requiresAuth);