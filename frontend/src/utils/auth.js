// Helper to get token from localStorage
export const getToken = () => localStorage.getItem('token');

// Helper to parse JWT payload (no verification — that happens on backend)
export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem('token');
      return null;
    }
    return payload; // { userId, fullName, std, board, iat, exp }
  } catch {
    return null;
  }
};

// Authenticated fetch — automatically adds Bearer token header
export const authFetch = (url, options = {}) => {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
};
