'use client';

import { useState, useEffect } from 'react';
import type { RecipeData } from '@/lib/types';

const FAVORITES_KEY = 'favorites_ids';
const WEIGHTS_KEY = 'recipe_weights';

export function useFavorites(allRecipes: RecipeData[]) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedIds = localStorage.getItem(FAVORITES_KEY);
    if (storedIds) {
      try {
        setFavoriteIds(new Set<string>(JSON.parse(storedIds)));
      } catch (e) {}
    }

    const storedWeights = localStorage.getItem(WEIGHTS_KEY);
    if (storedWeights) {
      try {
        setWeights(JSON.parse(storedWeights));
      } catch (e) {}
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (favoriteIds.size > 0) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favoriteIds)));
    } else {
      localStorage.removeItem(FAVORITES_KEY);
    }
  }, [favoriteIds]);

  useEffect(() => {
    if (Object.keys(weights).length > 0) {
      localStorage.setItem(WEIGHTS_KEY, JSON.stringify(weights));
    } else {
      localStorage.removeItem(WEIGHTS_KEY);
    }
  }, [weights]);

  const toggleFavorite = (id: string) => {
    const key = String(id);

    // Сначала считаем, каким будет новый Set
    let nextSize = favoriteIds.size;
    if (favoriteIds.has(key)) {
      nextSize -= 1;
    } else {
      nextSize += 1;
    }

    // Обновляем стейт
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });

    // Сообщаем всем компонентам (включая Header на этой же вкладке) точный count
    window.dispatchEvent(
      new CustomEvent('favorites-changed', {
        detail: { count: nextSize },
      })
    );
  };

  const setWeight = (id: string, weight: number) => {
    setWeights((prev) => ({ ...prev, [String(id)]: weight }));
  };

  const onResetWeight = (id: string) => {
    setWeights((prev) => {
      const next = { ...prev };
      delete next[String(id)];
      return next;
    });
  };

  return {
    favoriteIds,
    weights,
    isLoading,
    toggleFavorite,
    setWeight,
    onResetWeight,
  };
}

























