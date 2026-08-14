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
  return <CatalogPage recipes={recipesData} mode="all" />;
}












 

















