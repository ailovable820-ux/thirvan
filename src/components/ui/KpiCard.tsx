interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: number | null;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function KpiCard({ label, value, sub, trend, badge, icon }: KpiCardProps) {
  const trendEl = trend != null ? (
    trend > 0
      ? <span className="flex items-center gap-0.5 text-teal-600 text-xs font-medium"><TrendingUp className="w-3 h-3" />+{trend.toFixed(1)}%</span>
      : trend < 0
        ? <span className="flex items-center gap-0.5 text-red-500 text-xs font-medium"><TrendingDown className="w-3 h-3" />{trend.toFixed(1)}%</span>
        : <span className="flex items-center gap-0.5 text-navy-400 text-xs"><Minus className="w-3 h-3" />0%</span>
  ) : null;

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-navy-400 uppercase tracking-wide">{label}</p>
        {icon && <div className="p-1.5 rounded-lg bg-teal-50 text-teal-500">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-navy-900 leading-tight">{value}</p>
      <div className="flex items-center gap-2 mt-1">
        {trendEl}
        {sub && <p className="text-xs text-navy-400">{sub}</p>}
      </div>
      {badge && <div className="mt-2">{badge}</div>}
    </div>
  );
}
