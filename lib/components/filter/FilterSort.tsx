'use client';

import React from 'react';
import type { SortOption, FilterSortProps } from '@/lib/types';

const options: { label: string; value: SortOption }[] = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Калории: по возрастанию', value: 'caloriesAsc' },
  { label: 'Калории: по убыванию', value: 'caloriesDesc' },
  { label: 'Время: по возрастанию', value: 'durationAsc' },
  { label: 'Время: по убыванию', value: 'durationDesc' },
] as const;

export default function FilterSort({ sort, onSortChange }: FilterSortProps) {
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-textMuted mb-2">Сортировка</div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="w-[97%] border border-border bg-bg rounded-lg px-4 py-3 text-sm text-text
          focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}







