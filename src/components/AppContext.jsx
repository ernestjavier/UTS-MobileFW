import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const TOKEN_KEY = 'cookpedia_token';

const DEFAULT_SETTINGS = {
  pushNotifications: true,
  soundEffects: true,
  emailDigest: false
};

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const saveToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage tidak tersedia; sesi hanya bertahan selama aplikasi terbuka
  }
};

// Avatar berisi huruf depan nama, untuk user yang belum punya foto
const initialsAvatar = (name) => {
  const initial = encodeURIComponent((name?.trim()[0] || '?').toUpperCase());
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="%23FFE6D2"/><text x="50%" y="50%" dy=".35em" font-family="sans-serif" font-size="44" font-weight="700" fill="%23F47C38" text-anchor="middle">${initial}</text></svg>`;
};

const normalizeUser = (user) => ({
  ...user,
  avatar: user.avatar || initialsAvatar(user.name),
  favoriteCategory: user.favoriteCategory || '-'
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(readToken);
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(() => !!readToken());

  const [recipes, setRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    color: 'primary'
  });

  const isAuthenticated = !!token && !!user;

  const showToast = useCallback((message, color = 'primary') => {
    setToast({ isOpen: true, message, color });
  }, []);

  const hideToast = () => {
    setToast(prev => ({ ...prev, isOpen: false }));
  };

  const clearSession = useCallback(() => {
    saveToken(null);
    setToken(null);
    setUser(null);
    setFavorites([]);
    setPreferences([]);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const handleApiError = (err) => {
    if (err.status === 401) {
      clearSession();
      showToast('Your session has expired. Please log in again.', 'danger');
    } else {
      showToast(err.message, 'danger');
    }
  };

  // ---------- Resep (publik) ----------

  const loadRecipes = useCallback(async () => {
    setRecipesLoading(true);
    setRecipesError(null);
    try {
      const result = await api.getRecipes();
      setRecipes(result.data);
    } catch (err) {
      setRecipesError(err.message);
    } finally {
      setRecipesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // ---------- Data user, dimuat ulang setiap token berubah ----------

  useEffect(() => {
    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    let cancelled = false;
    setIsAuthChecking(true);

    Promise.all([
      api.getMe(token),
      api.getFavorites(token),
      api.getPreferences(token),
      api.getSettings(token)
    ])
      .then(([me, favoriteRecipes, userPreferences, userSettings]) => {
        if (cancelled) return;
        setUser(normalizeUser(me));
        setFavorites(favoriteRecipes.map(r => r.id));
        setPreferences(userPreferences);
        setSettings(userSettings);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) clearSession();
        else showToast(err.message, 'danger');
      })
      .finally(() => {
        if (!cancelled) setIsAuthChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, clearSession, showToast]);

  // ---------- Auth ----------

  const startSession = (newToken, me) => {
    saveToken(newToken);
    setUser(normalizeUser(me));
    setToken(newToken);
  };

  const login = async (email, password) => {
    try {
      const result = await api.login(email, password);
      startSession(result.token, result.user);
      showToast(`Welcome, ${result.user.name}!`);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await api.register(name, email, password);
      startSession(result.token, result.user);
      showToast(`Account created. Welcome, ${result.user.name}!`);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = async () => {
    const currentToken = token;
    clearSession();
    showToast('You have been logged out.');
    if (currentToken) {
      try {
        await api.logout(currentToken);
      } catch {
        // Sesi lokal sudah dihapus, kegagalan di server tidak perlu ditampilkan
      }
    }
  };

  const updateProfile = async (changes) => {
    try {
      const updated = await api.updateProfile(token, changes);
      setUser(normalizeUser(updated));
      showToast('Profile updated.');
      return true;
    } catch (err) {
      handleApiError(err);
      return false;
    }
  };

  // ---------- Favorit ----------

  const toggleFavorite = async (recipeId) => {
    if (!token) return;

    const recipe = recipes.find(r => r.id === recipeId);
    const recipeName = recipe ? recipe.name : 'Recipe';
    const wasFavorite = favorites.includes(recipeId);

    // Update tampilan dulu, lalu batalkan jika request ke server gagal
    setFavorites(prev =>
      wasFavorite ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );

    try {
      if (wasFavorite) {
        await api.removeFavorite(token, recipeId);
        showToast(`"${recipeName}" removed from favorites.`);
      } else {
        await api.addFavorite(token, recipeId);
        showToast(`"${recipeName}" added to favorites!`);
      }
    } catch (err) {
      setFavorites(prev =>
        wasFavorite
          ? (prev.includes(recipeId) ? prev : [...prev, recipeId])
          : prev.filter(id => id !== recipeId)
      );
      handleApiError(err);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  const getFavoriteRecipes = () => {
    return recipes.filter(r => favorites.includes(r.id));
  };

  // ---------- Preferensi & settings ----------

  const togglePreference = async (id) => {
    const current = preferences.find(p => p.id === id);
    if (!current || !token) return;

    const selected = !current.selected;
    setPreferences(prev => prev.map(p => (p.id === id ? { ...p, selected } : p)));

    try {
      await api.updatePreference(token, id, selected);
    } catch (err) {
      setPreferences(prev => prev.map(p => (p.id === id ? { ...p, selected: !selected } : p)));
      handleApiError(err);
    }
  };

  const updateSettings = async (newSettings) => {
    if (!token) return;

    const previous = settings;
    setSettings(prev => ({ ...prev, ...newSettings }));

    try {
      const saved = await api.updateSettings(token, newSettings);
      setSettings(saved);
      showToast('Settings updated.');
    } catch (err) {
      setSettings(previous);
      handleApiError(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isAuthChecking,
        user,
        recipes,
        recipesLoading,
        recipesError,
        reloadRecipes: loadRecipes,
        favorites,
        preferences,
        settings,
        toast,
        login,
        register,
        logout,
        updateProfile,
        toggleFavorite,
        isFavorite,
        getFavoriteRecipes,
        togglePreference,
        updateSettings,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
