module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Твои основные цвета
        primary: '#6B8F6B',          // основной зелёный
        primaryDark: '#4A7C59',      // тёмный вариант (для hover/активных)
        primaryLight: '#E8F0E8',     // светлый фон (для карточек/ховера)

        // Фоны
        bg: '#FFFFFF',               // чистый белый
        bgSoft: '#F7F7F5',           // мягкий почти‑белый
        bgWarm: '#F5EFE6',          // тёплый кремовый (можно для секций)

        // Текст
        text: '#2C2C2C',             // основной текст
        textMuted: '#888888',        // приглушённый серый
        textLight: '#BBBBBB',        // очень светлый серый

        // Границы
        border: '#E0E0DC',           // цвет границы
        borderLight: '#F0F0EC',      // светлая граница

        // Ошибки/успех
        error: '#C0392B',            // красный для ошибок
        success: '#4A7C59',          // зелёный для успеха (совпадает с primaryDark)
      },
      borderRadius: {
        card: '12px',                // аккуратное скругление карточек
        pill: '9999px',             // полностью круглые кнопки
      },
    },
  },
  plugins: [],
}

