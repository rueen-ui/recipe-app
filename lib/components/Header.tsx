'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites_ids';

export default function Header() {
  const [count, setCount] = useState<number>(0);

  const loadCountFromStorage = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (!stored) {
        setCount(0);
        return;
      }
      const favorites = JSON.parse(stored);
      const newCount = Array.isArray(favorites)
        ? favorites.length
        : (typeof favorites === 'object' && favorites !== null
            ? Object.keys(favorites).length
            : 0);
      setCount(newCount);
    } catch (e) {
      console.error('Ошибка парсинга favorites в хедере', e);
      setCount(0);
    }
  };

  // Обработчик для стандартного события storage (тип строгий)
  const handleStorageChange = (ev: StorageEvent) => {
    loadCountFromStorage();
  };

  // Обработчик для кастомного события (тип приводим к EventListener)
  const handleFavoritesChanged = (e: CustomEvent) => {
    const detail = e.detail as { count?: number };
    if (detail.count !== undefined) {
      setCount(detail.count);
    }
  };

  useEffect(() => {
    // 1. Инициализация при загрузке
    loadCountFromStorage();

    // 2. Добавляем слушатель для других вкладок (стандартное событие)
    window.addEventListener('storage', handleStorageChange);

    // 3. Добавляем слушатель для текущей вкладки (кастомное событие)
    // Здесь мы явно приводим тип функции к EventListener, чтобы обойти ошибку TS
    window.addEventListener(
      'favorites-changed',
      handleFavoritesChanged as EventListener
    );

    return () => {
      // Удаляем точно так же, приводя типы
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'favorites-changed',
        handleFavoritesChanged as EventListener
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      <div className="max-w-[1200px] mx-auto px-8 md:px-6 w-full">
        <div className="flex justify-between items-center h-14">
          <Link
            href="/"
            className="text-xl font-bold text-text hover:text-text/70 transition-colors duration-200"
          >
            Recipe App
          </Link>

          <Link
            href="/my-favorites"
            className="flex items-center gap-2 text-white group"
            aria-label="Избранное"
          >
            <span className="relative inline-flex">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-200 text-text group-hover:stroke-text/70"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>

              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold z-10">
                  {count}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}














