import type { RecipeData } from '@/lib/types';

export async function loadRecipes(): Promise<RecipeData[]> {
  const res = await fetch('/data.json', {
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить рецепты');
  }

  return res.json();
}
