'use client';

import React from 'react';
import type { FilterToggleProps } from '@/lib/types';

export default function FilterToggle({ isOpen, onToggle }: FilterToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-checked={isOpen}
      aria-label={isOpen ? 'Закрыть фильтр' : 'Открыть фильтр'}
      className="relative flex items-center justify-center w-12 h-7 rounded-full overflow-hidden border border-border mr-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {/* Фон */}
      <div
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isOpen ? 'bg-primary' : 'bg-bgWarm'
        }`}
      />

      {/* Бегунок */}
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-transform duration-300 flex items-center justify-center ${
          isOpen
            ? 'translate-x-[3.5px]'
            : 'translate-x-[-3.5px]'
        }`}
      />
    </button>
  );
}













