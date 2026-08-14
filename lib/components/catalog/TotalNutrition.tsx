'use client';

import type { RecipeData, TotalNutritionProps } from '@/lib/types';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-total';
import StatCard from './StatCard';

export default function TotalNutrition({ recipes, favoriteIds, weights }: TotalNutritionProps) {
  const favoritesOnly = recipes.filter((r) => favoriteIds.has(String(r.id)));
  const total = calculateTotalNutrition(favoritesOnly, weights);

  if (!favoritesOnly.length) {
    return (
      <div className="mt-8 p-6 bg-bg/50 border border-border rounded-xl text-muted text-center">
        Добавьте рецепты в избранное, чтобы увидеть сумму
      </div>
    );
  }

  const calories = total.calories;

  const getPercent = (grams: number, kcalPerGram: number) => {
    if (calories <= 0) return 0;
    const kcal = grams * kcalPerGram;
    return Math.round((kcal / calories) * 100);
  };

  const proteinsPercent = getPercent(total.proteins, 4);
  const fatsPercent = getPercent(total.fats, 9);
  const carbsPercent = getPercent(total.carbs, 4);

  return (
    <div className="mt-8 border border-border bg-bg/50 rounded-xl overflow-hidden">
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-text">Итого за подборку</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4">
        <StatCard
          label="Белки"
          value={Math.round(total.proteins)}
          unit="г"
          percent={proteinsPercent}
        />
        <StatCard
          label="Жиры"
          value={Math.round(total.fats)}
          unit="г"
          percent={fatsPercent}
        />
        <StatCard
          label="Углеводы"
          value={Math.round(total.carbs)}
          unit="г"
          percent={carbsPercent}
        />
        <StatCard
          label="Клетчатка"
          value={Math.round(total.fiber)}
          unit="г"
        />
        <StatCard
          label="Калории"
          value={Math.round(calories)}
          unit="ккал"
        />
      </div>
    </div>
  );
}
















