'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import type { RecipeData, CalorieOption, DurationOption, SortOption, FilterState, } from '@/lib/types';
import React from 'react';

export function useCatalogFilters(recipes: RecipeData[]) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const duration = (searchParams.get('duration') as DurationOption) || 'all';
  const calories = (searchParams.get('calories') as CalorieOption) || 'all';
  const hasHighProtein = searchParams.has('hasHighProtein');
  const hasHighFiber = searchParams.has('hasHighFiber');
  const sort = (searchParams.get('sort') as SortOption) || 'default';

  const currentFilters: FilterState = {
    duration,
    calories,
    hasHighProtein,
    hasHighFiber,
    sort,
  };

  const setFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('duration', newFilters.duration);
    params.set('calories', newFilters.calories);
    params.set('sort', newFilters.sort);

    if (newFilters.hasHighProtein) {
      params.set('hasHighProtein', '');
    } else {
      params.delete('hasHighProtein');
    }

    if (newFilters.hasHighFiber) {
      params.set('hasHighFiber', '');
    } else {
      params.delete('hasHighFiber');
    }

    router.push(`?${params.toString()}`);
  };

  const filteredRecipes = React.useMemo(() => {
    if (!recipes || recipes.length === 0) return [];

    let result = [...recipes];

    if (duration !== 'all') {
      const maxTimeMap: Record<DurationOption, number> = {
        upTo5: 5,
        upTo15: 15,
        upTo30: 30,
        all: Infinity,
      };
      const maxTime = maxTimeMap[duration] ?? 30;
      result = result.filter((r) => r.duration <= maxTime);
    }

    if (calories !== 'all') {
      const maxCalsMap: Record<CalorieOption, number> = {
        upTo150: 150,
        upTo200: 200,
        upTo300: 300,
        all: Infinity,
      };
      const maxCals = maxCalsMap[calories] ?? 300;
      result = result.filter((r) => (r.calories ?? 0) <= maxCals);
    }

    if (hasHighProtein) {
      result = result.filter((r) => (r.bjuPer100?.proteins ?? 0) >= 10);
    }

    if (hasHighFiber) {
      result = result.filter((r) => (r.fiberPer100 ?? 0) >= 4);
    }

    if (sort !== 'default') {
      result.sort((a, b) => {
        if (sort === 'caloriesAsc') return (a.calories ?? 0) - (b.calories ?? 0);
        if (sort === 'caloriesDesc') return (b.calories ?? 0) - (a.calories ?? 0);
        if (sort === 'durationAsc') return a.duration - b.duration;
        if (sort === 'durationDesc') return b.duration - a.duration;
        return 0;
      });
    }

    return result;
  }, [recipes, duration, calories, hasHighProtein, hasHighFiber, sort]);

  return {
    filters: currentFilters,
    setFilters,
    filteredRecipes,
  };
}




