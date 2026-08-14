'use client';

import type { StatCardProps } from '@/lib/types';

export default function StatCard({ label, value, unit, percent }: StatCardProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-1 p-3 rounded-lg bg-white/20 backdrop-blur-sm text-left h-full">
      <span className="text-xs text-textMuted uppercase font-medium tracking-wide">
        {label}
      </span>

      <span className="text-xl font-bold text-primary">
        {value} {unit}
      </span>

      {percent !== undefined && (
        <span className="text-[13px] font-normal text-textMuted">
          ~{percent}% от ккал
        </span>
      )}
    </div>
  );
}
