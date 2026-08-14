import type { RecipeData } from '@/lib/types';

export function calculateTotalNutrition(
  recipes: RecipeData[],
  weights: Record<string, number>
) {
  let totalCalories = 0;
  let totalProteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalFiber = 0; 

  for (const r of recipes) {
    const w = weights[String(r.id)] ?? r.weight ?? 0;
    const fiberPer100 = r.fiberPer100 ?? 0;

    const factor = w / 100;

    totalProteins += r.bjuPer100.proteins * factor;
    totalFats += r.bjuPer100.fats * factor;
    totalCarbs += r.bjuPer100.carbs * factor;
    totalFiber += fiberPer100 * factor; 

    totalCalories +=
      (r.bjuPer100.proteins * 4 + r.bjuPer100.fats * 9 + r.bjuPer100.carbs * 4) *
      factor;
  }

  return {
    calories: totalCalories,
    proteins: totalProteins,
    fats: totalFats,
    carbs: totalCarbs,
    fiber: totalFiber, 
  };
}




