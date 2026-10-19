import type { DataType } from '@/types';
import { DATA_TYPE_LABELS } from '@/types';

interface DataBadgeProps {
  type: DataType;
  className?: string;
}

export function DataBadge({ type, className = '' }: DataBadgeProps) {
  const baseClass = {
    official_published: 'badge-official',
    synthetic_demo: 'badge-synthetic',
    derived_calculation: 'badge-derived',
    forecast_estimate: 'badge-derived',
    insufficient_data: 'badge-insufficient',
  }[type];

  return (
    <span className={`${baseClass} ${className}`}>
      {DATA_TYPE_LABELS[type]}
    </span>
  );
}
