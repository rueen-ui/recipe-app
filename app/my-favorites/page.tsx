'use client';

import CatalogPage from '@/lib/components/catalog/CatalogPage';
import TotalNutrition from '@/lib/components/catalog/TotalNutrition';
import recipesData from '@/app/data.json';
import { useFavorites } from '@/lib/hooks/useFavorites';

export default function MyFavoritesPage() {
  const {
    favoriteIds,
    weights,
    toggleFavorite,
    setWeight,
    onResetWeight,
    isLoading,
  } = useFavorites(recipesData);

  if (isLoading) return <div>Загрузка...</div>;

  const displayedRecipes = recipesData.filter((r) => favoriteIds.has(String(r.id)));

  return (
    <>
      <CatalogPage
        recipes={recipesData}
        mode="favorites"
        favoriteIds={favoriteIds}
        weights={weights}
        toggleFavorite={toggleFavorite}
        setWeight={setWeight}
        onResetWeight={onResetWeight}
        isLoading={isLoading}
      />
      <TotalNutrition
        recipes={displayedRecipes}
        favoriteIds={favoriteIds}
        weights={weights}
      />
    </>
  );
}



























