import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount and when storage changes
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('campusHustleFavorites');
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites);
          setFavorites(parsed);
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    // Load on mount
    loadFavorites();

    // Listen for storage changes (cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'campusHustleFavorites') {
        loadFavorites();
      }
    };

    // Listen for custom events (same-tab updates)
    const handleFavoritesUpdate = (e: Event) => {
      // Skip reload if this event was triggered by our own save (prevents loop)
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.skipReload) {
        return;
      }
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    // Skip on initial mount if localStorage is empty
    const existing = localStorage.getItem('campusHustleFavorites');
    const existingParsed = existing ? JSON.parse(existing) : [];
    
    // Only save and dispatch if favorites actually changed (prevent loops)
    if (JSON.stringify(existingParsed) === JSON.stringify(favorites)) {
      return;
    }
    
    localStorage.setItem('campusHustleFavorites', JSON.stringify(favorites));
    // Use a flag to prevent re-triggering the listener
    const event = new CustomEvent('favoritesUpdated', { detail: { skipReload: true } });
    window.dispatchEvent(event);
  }, [favorites]);

  const addToFavorites = (hustlerId: string | number) => {
    const id = String(hustlerId);
    setFavorites((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromFavorites = (hustlerId: string | number) => {
    const id = String(hustlerId);
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const toggleFavorite = (hustlerId: string | number) => {
    const id = String(hustlerId);
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const isFavorite = (hustlerId: string | number) => {
    const id = String(hustlerId);
    return favorites.includes(id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};

