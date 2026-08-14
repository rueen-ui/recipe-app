'use client';

import type { RecipeNutritionSummaryProps } from '@/lib/types';

export default function RecipeNutritionSummary({
  title,
  proteins,
  fats,
  carbs,
  calories,
  fiber,
}: RecipeNutritionSummaryProps) {
  return (
    <div>
      {title && (
        <p className="text-sm text-textMuted uppercase font-semibold mb-2 tracking-wide">
          {title}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-sm text-text font-medium mb-2">
        <span>
          <span className="font-bold text-primary">Б</span>: {Math.round(proteins)} г
        </span>
        <span>
          <span className="font-bold text-primary">Ж</span>: {Math.round(fats)} г
        </span>
        <span>
          <span className="font-bold text-primary">У</span>: {Math.round(carbs)} г
        </span>

        {fiber !== undefined && fiber > 0 && (
          <span>
            <span className="font-bold text-primary">Кл</span>: {Math.round(fiber)} г
          </span>
        )}
      </div>

      <div className="text-sm text-text font-medium">
        <span className="font-bold text-primary">К</span>: {Math.round(calories)} ккал
      </div>
    </div>
  );
}



