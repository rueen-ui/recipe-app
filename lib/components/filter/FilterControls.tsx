'use client';

import React from 'react';
import type { DurationOption, CalorieOption, FilterControlsProps } from '@/lib/types';

const durationOptions = [
  { label: 'Любое время', value: 'all' as const },
  { label: 'До 5 мин', value: 'upTo5' as const },
  { label: 'До 15 мин', value: 'upTo15' as const },
  { label: 'До 30 мин', value: 'upTo30' as const },
] as const;

const calorieOptions = [
  { label: 'Любые калории', value: 'all' as const },
  { label: 'До 150 ккал', value: 'upTo150' as const },
  { label: 'До 200 ккал', value: 'upTo200' as const },
  { label: 'До 300 ккал', value: 'upTo300' as const },
] as const;

export default function FilterControls({
  duration,
  calories,
  hasHighProtein,
  hasHighFiber,
  onDurationChange,
  onCaloriesChange,
  onHasHighProteinChange,
  onHasHighFiberChange,
}: FilterControlsProps) {
  const renderCheckbox = (
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string
  ) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 w-full h-full border border-border rounded bg-bg text-primary
            focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all appearance-none
            checked:bg-primary checked:border-transparent checked:shadow-none"
        />
        {checked && (
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium text-text group-hover:text-primaryDark">
        {label}
      </span>
    </label>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-medium text-textMuted mb-2">Длительность</div>
        <select
          value={duration}
          onChange={(e) => onDurationChange(e.target.value as DurationOption)}
          className="w-[97%] border border-border bg-bg rounded-lg px-4 py-3 text-sm text-text
            focus:outline-none focus:ring-2 focus:ring-primary transition-shadow block"
        >
          {durationOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-sm font-medium text-textMuted mb-2">Калории</div>
        <select
          value={calories}
          onChange={(e) => onCaloriesChange(e.target.value as CalorieOption)}
          className="w-[97%] border border-border bg-bg rounded-lg px-4 py-3 text-sm text-text
            focus:outline-none focus:ring-2 focus:ring-primary transition-shadow block"
        >
          {calorieOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {renderCheckbox(
          hasHighProtein,
          (e) => onHasHighProteinChange(e.target.checked),
          'Много белка'
        )}
        {renderCheckbox(
          hasHighFiber,
          (e) => onHasHighFiberChange(e.target.checked),
          'Много клетчатки'
        )}
      </div>
    </div>
  );
}











