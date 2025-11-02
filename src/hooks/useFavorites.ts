import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('campusHustleFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('campusHustleFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (hustlerId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(hustlerId)) {
        return [...prev, hustlerId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (hustlerId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== hustlerId));
  };

  const toggleFavorite = (hustlerId: string) => {
    if (isFavorite(hustlerId)) {
      removeFromFavorites(hustlerId);
    } else {
      addToFavorites(hustlerId);
    }
  };

  const isFavorite = (hustlerId: string) => {
    return favorites.includes(hustlerId);
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

