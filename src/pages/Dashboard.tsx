import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Activity, TrendingUp, MapPin, RefreshCw, AlertTriangle } from 'lucide-react';
import { useApp, DISTRICTS, OCCUPATION_SKILL_MAP, SKILLS } from '@/context/AppContext';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { KpiCard } from '@/components/ui/KpiCard';
import { DataBadge } from '@/components/ui/DataBadge';
import { EmptyState } from '@/components/ui/StatusDisplay';
import {
  applyFilters,
  calcTotalDemand,
  calcDemandChange,
  calcDataFreshness,
  aggregateMonthly,
  topOccupations,
  topSkills,
  sectorComparison,
  districtComparison,
} from '@/data/calculations';

const SECTOR_COLORS: Record<string, string> = {
  'IT/Software': '#0D9488',
  'Manufacturing': '#E8AE45',
  'Healthcare': '#0B1730',
};

const DISTRICT_COLORS = ['#0D9488', '#E8AE45', '#3b82f6', '#ec4899'];

export function Dashboard() {
  const { demandRecords, filters } = useApp();

  const filtered = useMemo(() => applyFilters(demandRecords, filters), [demandRecords, filters]);

  const totalDemand = useMemo(() => calcTotalDemand(filtered), [filtered]);
  const demandChange = useMemo(() => calcDemandChange(filtered), [filtered]);
  const dataFreshness = useMemo(() => calcDataFreshness(filtered), [filtered]);
  const monthlyData = useMemo(() => aggregateMonthly(filtered), [filtered]);
  const topOccs = useMemo(() => topOccupations(filtered, 8), [filtered]);
  const topSkillData = useMemo(
    () => topSkills(filtered, OCCUPATION_SKILL_MAP, SKILLS, 8),
    [filtered]
  );
  const sectors = useMemo(() => sectorComparison(filtered), [filtered]);
  const districts = useMemo(() => districtComparison(filtered, DISTRICTS), [filtered]);

  const hasSyntheticData = filtered.some(r => r.data_type === 'synthetic_demo');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="section-heading">Dashboard</h1>
          <p className="section-subheading">
            Labour demand signals across Tamil Nadu pilot districts
          </p>
        </div>
        {hasSyntheticData && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gold-50 border border-gold-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-gold-600" />
            <span className="text-xs text-gold-700 font-medium">Contains synthetic demo data</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <FilterPanel className="mb-6" />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Demand Signal (total postings)"
          value={totalDemand.toLocaleString()}
          trend={demandChange}
          sub={demandChange != null ? 'vs previous period' : 'selected period'}
          icon={<Activity className="w-4 h-4" />}
          badge={<DataBadge type="synthetic_demo" />}
        />
        <KpiCard
          label="Districts in view"
          value={[...new Set(filtered.map(r => r.district_id))].length}
          sub="of 4 pilot districts"
          icon={<MapPin className="w-4 h-4" />}
        />
        <KpiCard
          label="Forecast horizon"
          value="3 / 6 / 12 mo"
          sub="configurable on Forecast page"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <KpiCard
          label="Data freshness"
          value={dataFreshness ?? 'N/A'}
          sub="latest period end date"
          icon={<RefreshCw className="w-4 h-4" />}
          badge={<DataBadge type="synthetic_demo" />}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No data matches the selected filters." sub="Try clearing some filters to see data." />
      ) : (
        <>
          {/* Monthly trend */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-navy-800">Monthly Demand Trend</h2>
              <DataBadge type="synthetic_demo" />
            </div>
            <p className="text-xs text-navy-400 mb-4">Total job-posting signals per month across selected filters</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} tickFormatter={v => v.slice(0, 7)} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number) => [v.toLocaleString(), 'Job postings']}
                  labelFormatter={l => `Period: ${l}`}
                />
                <Line type="monotone" dataKey="total" stroke="#0D9488" strokeWidth={2} dot={false} name="Total postings" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top occupations */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-navy-800">Top Occupations</h2>
                <DataBadge type="synthetic_demo" />
              </div>
              <p className="text-xs text-navy-400 mb-4">By total demand signal</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={topOccs} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="occupation_name" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Job postings']} />
                  <Bar dataKey="total_demand" radius={[0, 4, 4, 0]}>
                    {topOccs.map((occ) => (
                      <Cell key={occ.occupation_code} fill={SECTOR_COLORS[occ.sector_id] ?? '#0D9488'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top skills */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-navy-800">Top Skills (Inferred)</h2>
                <DataBadge type="derived_calculation" />
              </div>
              <p className="text-xs text-navy-400 mb-4">Derived from occupation-skill mappings — not directly observed</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={topSkillData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="skill_name" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Inferred demand']} />
                  <Bar dataKey="inferred_demand" fill="#E8AE45" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sector comparison */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-navy-800">Sector Comparison</h2>
                <DataBadge type="synthetic_demo" />
              </div>
              <p className="text-xs text-navy-400 mb-4">Total demand signal by sector</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sectors} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="sector_id" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Job postings']} />
                  <Bar dataKey="total_demand" radius={[4, 4, 0, 0]}>
                    {sectors.map((s) => (
                      <Cell key={s.sector_id} fill={SECTOR_COLORS[s.sector_id] ?? '#0D9488'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* District comparison */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-navy-800">District Comparison</h2>
                <DataBadge type="synthetic_demo" />
              </div>
              <p className="text-xs text-navy-400 mb-4">Total demand signal by district</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={districts} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="district_name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Job postings']} />
                  <Bar dataKey="total_demand" radius={[4, 4, 0, 0]}>
                    {districts.map((d, i) => (
                      <Cell key={d.district_id} fill={DISTRICT_COLORS[i % DISTRICT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly trend by sector */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-navy-800">Demand by Sector Over Time</h2>
              <DataBadge type="synthetic_demo" />
            </div>
            <p className="text-xs text-navy-400 mb-4">Monthly job-posting signals per sector</p>
            <SectorTrendChart records={filtered} />
          </div>

          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 text-sm text-gold-800">
            <span className="font-semibold">Note:</span> All demand data above is synthetic demo data generated for prototype demonstration. Job postings are demand signals — not unique vacancies or total employment. Do not cite these figures as official Tamil Nadu labour-market statistics.
          </div>
        </>
      )}
    </div>
  );
}

function SectorTrendChart({ records }: { records: ReturnType<typeof applyFilters> }) {
  const data = useMemo(() => {
    const periods = [...new Set(records.map(r => r.period_start.slice(0, 7)))].sort();
    const sectors = [...new Set(records.map(r => r.sector_id))];
    return periods.map(period => {
      const point: Record<string, string | number> = { period };
      for (const sector of sectors) {
        point[sector] = records
          .filter(r => r.period_start.slice(0, 7) === period && r.sector_id === sector)
          .reduce((s, r) => s + r.demand_count, 0);
      }
      return point;
    });
  }, [records]);

  const sectors = [...new Set(records.map(r => r.sector_id))];
  const COLORS = ['#0D9488', '#E8AE45', '#0B1730'];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="period" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v: number, name: string) => [v.toLocaleString(), name]} />
        <Legend />
        {sectors.map((sector, i) => (
          <Line key={sector} type="monotone" dataKey={sector} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
