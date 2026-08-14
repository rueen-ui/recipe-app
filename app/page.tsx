import { Suspense } from 'react';
import type { RecipeData } from '@/lib/types';
import CatalogPage from '@/lib/components/catalog/CatalogPage';
import recipesData from './data.json';

export async function generateMetadata() {
  const count = recipesData.length;

  return {
    title: `Рецепты: каталог из ${count} блюд`,
    description: 'Каталог рецептов с расчетом БЖУ под любой вес порции.',
  };
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
        </div>
      }
    >
      <CatalogPage recipes={recipesData} mode="all" />
    </Suspense>
  );
}













 

















