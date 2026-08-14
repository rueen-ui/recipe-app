'use client';

import type { RecipeData, RecipeCardProps } from '@/lib/types';
import { calculateRecipeValues } from '@/lib/utils/recipe-calc';
import RecipeWeightInput from './RecipeWeightInput';
import FavoriteToggleButton from './FavoriteToggleButton';
import RecipeNutritionSummary from './RecipeNutritionSummary';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({
  recipe,
  customWeight,
  isFavorite,
  onWeightChange,
  onResetWeight,
  toggleFavorite,
}: RecipeCardProps) { 
  const { proteins, fats, carbs, calories, caloriesPer100, fiber } = calculateRecipeValues(
    recipe,
    customWeight
  );

  return (
    <article className="border border-border bg-bg rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="h-44 relative bg-bgWarm overflow-hidden">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover" 
            priority={false} 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-textLight uppercase font-medium bg-bgWarm">
            No image
          </div>
        )}
        
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-border text-xs font-bold text-text">
          {Math.round(calories)} ккал
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-text line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          <Link 
            href={`/recipe/${recipe.id}`} 
            className="block"
          >
            {recipe.title}
          </Link>
        </h3>

        <p className="text-textMuted text-sm mb-4 flex items-center gap-2">
          <span>⏱ {recipe.duration} мин</span>
          <span>•</span>
          <span>{Math.round(calories)} ккал</span>
        </p>

        <RecipeNutritionSummary
          title="На 100 г"
          proteins={recipe.bjuPer100.proteins}
          fats={recipe.bjuPer100.fats}
          carbs={recipe.bjuPer100.carbs}
          calories={caloriesPer100}
          fiber={recipe.fiberPer100 ?? 0}
        />

        <hr className="my-4 border-border" />

        <div>
          <p className="text-sm text-textMuted uppercase font-semibold mb-2 tracking-wide">
            Итого на порцию ({customWeight > 0 ? customWeight : '—'} г)
          </p>

          <RecipeWeightInput
            weight={customWeight}
            onChange={(w) => onWeightChange(recipe.id, w)}
            onReset={() => onResetWeight(recipe.id)}
          />

          <div className="mt-4">
            <RecipeNutritionSummary
              title=""
              proteins={proteins}
              fats={fats}
              carbs={carbs}
              calories={calories}
              fiber={fiber}
            />
          </div>
        </div>

        {toggleFavorite && (
          <FavoriteToggleButton
            isFavorite={isFavorite}
            onClick={() => toggleFavorite(recipe.id)}
          />
        )}
      </div>
    </article>
  );
}





































