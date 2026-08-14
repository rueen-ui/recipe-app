import type { RecipeData } from '@/lib/types';
import recipesData from '@/app/data.json';

import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  // Сначала ждём params — это обязательно
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return {
      title: 'Рецепт',
      description: 'Информация о рецепте недоступна.',
    };
  }

  // Ищем рецепт прямо здесь — так заголовок будет с настоящим названием
  const recipe = recipesData.find((r) => r.id === id);

  if (!recipe) {
    return {
      title: 'Рецепт не найден',
      description: 'Такой рецепт отсутствует в каталоге.',
    };
  }

  return {
    title: `Рецепт: ${recipe.title}`,
    description: `Подробный рецепт ${recipe.title}: БЖУ и клетчатка на 100 г. Время приготовления: ${recipe.duration} мин.`,
  };
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const recipe = recipesData.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-slate-500">
        Рецепт не найден
      </div>
    );
  }

  const proteinsPer100 = recipe.bjuPer100.proteins;
  const fatsPer100 = recipe.bjuPer100.fats;
  const carbsPer100 = recipe.bjuPer100.carbs;
  const fiberPer100 = recipe.fiberPer100;

  const caloriesPer100 =
    (proteinsPer100 * 4) + (fatsPer100 * 9) + (carbsPer100 * 4);

  return (
    <div className="max-w-4xl mx-auto p-0 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">{recipe.title}</h1>

      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <InfoCard label="Время приготовления" value={`${recipe.duration} мин`} />
        <InfoCard
          label="Калорийность на 100 г"
          value={`${Math.round(caloriesPer100)} ккал`}
        />
        <InfoCard
          label="БЖУ на 100 г"
          value={`${Math.round(proteinsPer100)} г / ${Math.round(fatsPer100)} г / ${Math.round(carbsPer100)} г`}
        />
        <InfoCard
          label="Клетчатка на 100 г"
          value={`${Math.round(fiberPer100)} г`}
        />
      </div>

      <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Приготовление</h2>
        <ol className="list-decimal space-y-3 pl-6 text-slate-600 leading-relaxed">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function InfoCard({ label, value, className }: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`bg-slate-50 rounded-lg p-3 h-full flex flex-col justify-between ${className || ''}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <span className="text-lg font-bold text-slate-800 mt-1 block">
        {value}
      </span>
    </div>
  );
}







