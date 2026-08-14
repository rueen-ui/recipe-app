'use client';

import { X } from 'lucide-react';
import React from 'react';
import FilterControls from './FilterControls';
import FilterSort from './FilterSort';
import type { FilterSidebarProps, FilterState } from '@/lib/types';

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-full max-w-[320px] bg-bg border-r border-border shadow-xl flex flex-col overflow-y-auto transition-transform duration-300 ease-out translate-x-0">
      <header className="flex justify-between items-center px-6 py-4 border-b border-border bg-bg">
        <h2 className="text-xl font-bold text-text">Фильтр</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bgWarm transition-colors"
        >
          <X size={20} className="text-textMuted" />
        </button>
      </header>

      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        {/* Сортировка */}
        <FilterSort
          sort={filters.sort}
          onSortChange={(val) => setFilters({ ...filters, sort: val })}
        />

        {/* Контролы */}
        <FilterControls
          duration={filters.duration}
          calories={filters.calories}
          hasHighProtein={filters.hasHighProtein}
          hasHighFiber={filters.hasHighFiber}
          onDurationChange={(val) => setFilters({ ...filters, duration: val })}
          onCaloriesChange={(val) => setFilters({ ...filters, calories: val })}
          onHasHighProteinChange={(val) => setFilters({ ...filters, hasHighProtein: val })}
          onHasHighFiberChange={(val) => setFilters({ ...filters, hasHighFiber: val })}
        />
      </div>

      <div className="px-6 py-6 border-t border-border bg-bg">
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryDark active:bg-primaryLight transition-colors"
        >
          Закрыть
        </button>
      </div>
    </aside>
  );
}


















