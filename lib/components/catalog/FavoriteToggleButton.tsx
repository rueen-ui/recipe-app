'use client';

import { FavoriteToggleButtonProps } from '@/lib/types';

export default function FavoriteToggleButton({ isFavorite, onClick }: FavoriteToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full mt-4 px-3 py-2 rounded-pill text-sm font-medium transition-colors
        ${isFavorite
          ? 'bg-transparent border border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100'
          : 'bg-primary text-white hover:bg-primaryDark active:bg-primaryLight'}
      `}
    >
      {isFavorite ? 'Убрать из избранного' : 'В избранное'}
    </button>
  );
}


