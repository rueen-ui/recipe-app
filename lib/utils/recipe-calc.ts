import type { RecipeData } from '@/lib/types';

export function calculateRecipeValues(recipe: RecipeData, weight: number) {
  const per100 = recipe.bjuPer100;
  const fiberPer100 = recipe.fiberPer100 ?? 0;

  const factor = weight / 100;

  return {
    proteins: per100.proteins * factor,
    fats: per100.fats * factor,
    carbs: per100.carbs * factor,
    fiber: fiberPer100 * factor, // <--
    calories: (per100.proteins * 4 + per100.fats * 9 + per100.carbs * 4) * factor,
    caloriesPer100: per100.proteins * 4 + per100.fats * 9 + per100.carbs * 4,
  };
}




