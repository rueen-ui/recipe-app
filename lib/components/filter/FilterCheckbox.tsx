'use client';

import React from 'react';
import type { FilterCheckboxProps } from '@/lib/types';

export default function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center gap-4 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border border-border text-primary accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1"
      />
      <span className="text-base font-medium text-text group-hover:text-primary transition-colors">
        {label}
      </span>
    </label>
  );
}




