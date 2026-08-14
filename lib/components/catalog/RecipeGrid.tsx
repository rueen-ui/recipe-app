'use client';

import type { RecipeData, RecipeGridProps } from '@/lib/types';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({
  recipes,
  weights,
  setWeight,
  onResetWeight,
  toggleFavorite,
  favoriteIds,
}: RecipeGridProps) { 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => {
        const currentWeight = weights?.[String(r.id)] ?? r.weight;
        const isFavorite = favoriteIds?.has(r.id) ?? false;

        return (
          <RecipeCard
            key={r.id}
            recipe={r}
            customWeight={currentWeight}
            isFavorite={isFavorite}
            onWeightChange={setWeight ?? (() => {})}
            onResetWeight={onResetWeight ?? (() => {})}
            toggleFavorite={toggleFavorite}
          />
        );
      })}
    </div>
  );
}























