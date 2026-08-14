'use client';

import { useState, useCallback } from 'react';
import type { RecipeWeightInputProps } from '@/lib/types';

export default function RecipeWeightInput({
  weight,
  onChange,
  onReset,
}: RecipeWeightInputProps) {
  const [inputValue, setInputValue] = useState<string>(
    weight > 0 ? String(weight) : ''
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      if (raw === '') {
        return;
      }

      const val = Number(raw);
      
      if (!isNaN(val) && val > 0) {
        onChange(val);
      }
    },
    [onChange] 
  );

  const handleReset = () => {
    onReset();
    setInputValue('');
  };

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <label className="sr-only">Вес порции (г)</label>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Вес (г)"
          className="w-full h-12 bg-bgWarm border border-border rounded px-4 text-base text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          min="1"
          inputMode="decimal"
          autoComplete="off"
        />

      </div>
      <button
        type="button"
        onClick={handleReset}
        className="h-12 px-5 rounded border border-border text-textMuted hover:text-primary hover:border-primary active:bg-bg transition-all text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={inputValue === ''}
      >
        Сброс
      </button>
    </div>
  );
}




