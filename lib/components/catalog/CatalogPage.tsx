'use client';

import { useState } from 'react';
import type { RecipeData, CatalogPageProps } from '@/lib/types';
import FilterToggle from '../filter/FilterToggle';
import FilterSidebar from '../filter/FilterSidebar';
import RecipeGrid from './RecipeGrid';
import { useFavorites } from '../../hooks/useFavorites';
import { useCatalogFilters } from '@/lib/hooks/useCatalogFilters';

export default function CatalogPage({
  recipes,
  mode = 'all',
  favoriteIds: externalFavoriteIds,
  weights: externalWeights,
  toggleFavorite: externalToggleFavorite,
  setWeight: externalSetWeight,
  onResetWeight: externalOnResetWeight,
  isLoading: externalIsLoading,
}: CatalogPageProps) {
  const useExternalState = mode === 'favorites' && externalFavoriteIds !== undefined;

  const {
    favoriteIds = externalFavoriteIds!,
    weights = externalWeights!,
    toggleFavorite = externalToggleFavorite!,
    setWeight = externalSetWeight!,
    onResetWeight = externalOnResetWeight!,
    isLoading = externalIsLoading ?? false,
  } = useExternalState ? {} : useFavorites(recipes);

  const { filters, setFilters, filteredRecipes } = useCatalogFilters(recipes);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const displayedRecipes =
    mode === 'favorites'
      ? filteredRecipes.filter((r) => favoriteIds.has(String(r.id)))
      : filteredRecipes;

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex justify-between items-center gap-4 mb-8 z-10">
        <h1 className="text-4xl font-bold text-text">
          {mode === 'favorites' ? 'Мои рецепты' : 'Рецепты'}
        </h1>

        {mode === 'all' && (
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-textMuted uppercase tracking-wide">
              Фильтр
            </span>
            <FilterToggle
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen((prev) => !prev)}
            />
          </div>
        )}
      </div>

      {mode === 'all' && (
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <RecipeGrid
        recipes={displayedRecipes}
        weights={weights}
        setWeight={setWeight}
        onResetWeight={onResetWeight}
        toggleFavorite={toggleFavorite}
        favoriteIds={favoriteIds}
      />
    </div>
  );
}


























