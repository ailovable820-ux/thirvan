import { useApp, DISTRICTS, OCCUPATIONS } from '@/context/AppContext';
import { SECTORS } from '@/data/seeds';
import type { FilterState } from '@/types';

interface FilterPanelProps {
  showSkill?: boolean;
  className?: string;
}

const PILOT_DISTRICTS = ['CHE', 'CBE', 'MDU', 'TRY'];

export function FilterPanel({ showSkill = false, className = '' }: FilterPanelProps) {
  const { filters, setFilters, demandRecords } = useApp();

  const periods = [...new Set(demandRecords.map(r => r.period_start.slice(0, 7)))].sort();
  const minPeriod = periods[0] ?? '';
  const maxPeriod = periods[periods.length - 1] ?? '';

  function update(key: keyof FilterState, value: string) {
    setFilters({ ...filters, [key]: value });
  }

  function reset() {
    setFilters({ district: '', sector: '', occupation: '', skill: '', period_start: '', period_end: '' });
  }

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={`bg-white rounded-xl border border-navy-100 p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-navy-700">Filters</h3>
        {activeCount > 0 && (
          <button onClick={reset} className="text-xs text-teal-500 hover:underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div>
          <label className="filter-label">District</label>
          <select className="filter-select" value={filters.district} onChange={e => update('district', e.target.value)}>
            <option value="">All districts</option>
            {PILOT_DISTRICTS.map(id => {
              const d = DISTRICTS.find(d => d.district_id === id);
              return <option key={id} value={id}>{d?.district_name ?? id}</option>;
            })}
          </select>
        </div>
        <div>
          <label className="filter-label">Sector</label>
          <select className="filter-select" value={filters.sector} onChange={e => update('sector', e.target.value)}>
            <option value="">All sectors</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="filter-label">Occupation</label>
          <select className="filter-select" value={filters.occupation} onChange={e => update('occupation', e.target.value)}>
            <option value="">All occupations</option>
            {OCCUPATIONS
              .filter(o => !filters.sector || o.sector_id === filters.sector)
              .map(o => <option key={o.occupation_code} value={o.occupation_code}>{o.occupation_name}</option>)}
          </select>
        </div>
        <div>
          <label className="filter-label">From period</label>
          <input
            type="month"
            className="filter-select"
            value={filters.period_start.slice(0, 7)}
            min={minPeriod}
            max={maxPeriod}
            onChange={e => update('period_start', e.target.value ? e.target.value + '-01' : '')}
          />
        </div>
        <div>
          <label className="filter-label">To period</label>
          <input
            type="month"
            className="filter-select"
            value={filters.period_end.slice(0, 7)}
            min={minPeriod}
            max={maxPeriod}
            onChange={e => update('period_end', e.target.value ? e.target.value + '-28' : '')}
          />
        </div>
        {showSkill && (
          <div>
            <label className="filter-label">Skill</label>
            <select className="filter-select" value={filters.skill} onChange={e => update('skill', e.target.value)}>
              <option value="">All skills</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
