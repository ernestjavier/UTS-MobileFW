// Alamat API bisa diubah lewat file .env (VITE_API_URL).
// Di emulator Android gunakan http://10.0.2.2:3000/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new ApiError('Cannot reach the server. Make sure the API is running.', 0);
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(data?.error || `Request failed (${response.status}).`, response.status);
  }
  return data;
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: { name, email, password } }),
  logout: (token) => request('/auth/logout', { method: 'POST', token }),
  getMe: (token) => request('/auth/me', { token }),
  updateProfile: (token, changes) => request('/me', { method: 'PATCH', body: changes, token }),

  // Recipes
  getRecipes: () => request('/recipes?limit=50'),

  // Favorites
  getFavorites: (token) => request('/me/favorites', { token }),
  addFavorite: (token, recipeId) =>
    request('/me/favorites', { method: 'POST', body: { recipeId }, token }),
  removeFavorite: (token, recipeId) =>
    request(`/me/favorites/${encodeURIComponent(recipeId)}`, { method: 'DELETE', token }),

  // Preferences & settings
  getPreferences: (token) => request('/me/preferences', { token }),
  updatePreference: (token, id, selected) =>
    request(`/me/preferences/${encodeURIComponent(id)}`, { method: 'PATCH', body: { selected }, token }),
  getSettings: (token) => request('/me/settings', { token }),
  updateSettings: (token, changes) => request('/me/settings', { method: 'PATCH', body: changes, token })
};
