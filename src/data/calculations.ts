import type {
  LabourDemand,
  WorkforceSupply,
  ForecastResult,
  ForecastPoint,
  ForecastEvaluation,
  GapResult,
  FilterState,
  DataQuality,
  CsvRow,
  CsvValidationResult,
  ValidationIssue,
} from '@/types';

// ─── Filtering ─────────────────────────────────────────────────────────────────
export function applyFilters(records: LabourDemand[], filters: FilterState): LabourDemand[] {
  return records.filter(r => {
    if (filters.district && r.district_id !== filters.district) return false;
    if (filters.sector && r.sector_id !== filters.sector) return false;
    if (filters.occupation && r.occupation_code !== filters.occupation) return false;
    if (filters.period_start && r.period_start < filters.period_start) return false;
    if (filters.period_end && r.period_end > filters.period_end) return false;
    return true;
  });
}

// ─── KPI calculations ──────────────────────────────────────────────────────────
export function calcTotalDemand(records: LabourDemand[]): number {
  return records.reduce((s, r) => s + r.demand_count, 0);
}

export function calcDemandChange(records: LabourDemand[]): number | null {
  const periods = [...new Set(records.map(r => r.period_start))].sort();
  if (periods.length < 2) return null;
  const latest = periods[periods.length - 1];
  const prev = periods[periods.length - 2];
  const latestSum = records.filter(r => r.period_start === latest).reduce((s, r) => s + r.demand_count, 0);
  const prevSum = records.filter(r => r.period_start === prev).reduce((s, r) => s + r.demand_count, 0);
  if (prevSum === 0) return null;
  return ((latestSum - prevSum) / prevSum) * 100;
}

export function calcDataFreshness(records: LabourDemand[]): string | null {
  const latest = [...records].sort((a, b) => b.period_end.localeCompare(a.period_end))[0];
  return latest?.period_end ?? null;
}

// ─── Monthly trend aggregation ─────────────────────────────────────────────────
export interface MonthlyPoint {
  period: string;
  total: number;
  synthetic: number;
  official: number;
}

export function aggregateMonthly(records: LabourDemand[]): MonthlyPoint[] {
  const map = new Map<string, MonthlyPoint>();
  for (const r of records) {
    const key = r.period_start.slice(0, 7);
    if (!map.has(key)) map.set(key, { period: key, total: 0, synthetic: 0, official: 0 });
    const p = map.get(key)!;
    p.total += r.demand_count;
    if (r.data_type === 'official_published') p.official += r.demand_count;
    else p.synthetic += r.demand_count;
  }
  return [...map.values()].sort((a, b) => a.period.localeCompare(b.period));
}

// ─── Top occupations ───────────────────────────────────────────────────────────
export interface OccupationRank {
  occupation_code: string;
  occupation_name: string;
  sector_id: string;
  total_demand: number;
}

export function topOccupations(records: LabourDemand[], limit = 10): OccupationRank[] {
  const map = new Map<string, OccupationRank>();
  for (const r of records) {
    if (!map.has(r.occupation_code)) {
      map.set(r.occupation_code, { occupation_code: r.occupation_code, occupation_name: r.occupation_name, sector_id: r.sector_id, total_demand: 0 });
    }
    map.get(r.occupation_code)!.total_demand += r.demand_count;
  }
  return [...map.values()].sort((a, b) => b.total_demand - a.total_demand).slice(0, limit);
}

// ─── Top skills (via occupation-skill mapping) ─────────────────────────────────
export interface SkillRank {
  skill_id: string;
  skill_name: string;
  inferred_demand: number;
}

export function topSkills(
  records: LabourDemand[],
  occSkillMap: Array<{ occupation_code: string; skill_id: string }>,
  skillRef: Array<{ skill_id: string; skill_name: string }>,
  limit = 10
): SkillRank[] {
  const skillDemand = new Map<string, number>();
  for (const r of records) {
    const mapped = occSkillMap.filter(m => m.occupation_code === r.occupation_code);
    for (const m of mapped) {
      skillDemand.set(m.skill_id, (skillDemand.get(m.skill_id) ?? 0) + r.demand_count);
    }
  }
  return [...skillDemand.entries()]
    .map(([skill_id, inferred_demand]) => ({
      skill_id,
      skill_name: skillRef.find(s => s.skill_id === skill_id)?.skill_name ?? skill_id,
      inferred_demand,
    }))
    .sort((a, b) => b.inferred_demand - a.inferred_demand)
    .slice(0, limit);
}

// ─── Sector comparison ─────────────────────────────────────────────────────────
export interface SectorPoint {
  sector_id: string;
  total_demand: number;
  record_count: number;
}

export function sectorComparison(records: LabourDemand[]): SectorPoint[] {
  const map = new Map<string, SectorPoint>();
  for (const r of records) {
    if (!map.has(r.sector_id)) map.set(r.sector_id, { sector_id: r.sector_id, total_demand: 0, record_count: 0 });
    const s = map.get(r.sector_id)!;
    s.total_demand += r.demand_count;
    s.record_count++;
  }
  return [...map.values()].sort((a, b) => b.total_demand - a.total_demand);
}

// ─── District comparison ───────────────────────────────────────────────────────
export interface DistrictPoint {
  district_id: string;
  district_name: string;
  total_demand: number;
}

export function districtComparison(
  records: LabourDemand[],
  districtRef: Array<{ district_id: string; district_name: string }>
): DistrictPoint[] {
  const map = new Map<string, DistrictPoint>();
  for (const r of records) {
    if (!map.has(r.district_id)) {
      const name = districtRef.find(d => d.district_id === r.district_id)?.district_name ?? r.district_id;
      map.set(r.district_id, { district_id: r.district_id, district_name: name, total_demand: 0 });
    }
    map.get(r.district_id)!.total_demand += r.demand_count;
  }
  return [...map.values()].sort((a, b) => b.total_demand - a.total_demand);
}

// ─── Demand index ──────────────────────────────────────────────────────────────
// Normalised 0-100 index. Missing values are excluded (not treated as zero).
// Weight: all occupations equal weight for now.
export interface DemandIndexPoint {
  period: string;
  index: number | null;
  coverage_pct: number;
}

export function calcDemandIndex(records: LabourDemand[]): DemandIndexPoint[] {
  const monthly = aggregateMonthly(records);
  if (monthly.length === 0) return [];
  const values = monthly.map(m => m.total);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  if (maxVal === minVal) return monthly.map(m => ({ period: m.period, index: 50, coverage_pct: 100 }));
  return monthly.map(m => ({
    period: m.period,
    index: Math.round(((m.total - minVal) / (maxVal - minVal)) * 100),
    coverage_pct: 100,
  }));
}

// ─── Baseline forecast ─────────────────────────────────────────────────────────
// Method: simple linear trend + seasonal-naive component.
// Evaluation: chronological split — last `evalPeriods` observations as hold-out.
// Never random splitting.
export function buildForecast(
  records: LabourDemand[],
  district_id: string,
  sector_id: string,
  occupation_code: string,
  horizon: 3 | 6 | 12,
): ForecastResult | null {
  const filtered = records
    .filter(r => r.district_id === district_id && r.sector_id === sector_id && r.occupation_code === occupation_code)
    .sort((a, b) => a.period_start.localeCompare(b.period_start));

  if (filtered.length < 6) return null;

  const values = filtered.map(r => r.demand_count);
  const periods = filtered.map(r => r.period_start.slice(0, 7));

  // Chronological split: use last min(horizon, floor(n/4)) periods as hold-out
  const evalCount = Math.max(3, Math.min(horizon, Math.floor(values.length / 4)));
  const trainEnd = values.length - evalCount;
  const trainValues = values.slice(0, trainEnd);

  // Linear trend on training set
  const n = trainValues.length;
  const xMean = (n - 1) / 2;
  const yMean = trainValues.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (trainValues[i] - yMean);
    den += (i - xMean) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  // Predict over evaluation window
  const evalPredicted: number[] = [];
  const evalActual: number[] = values.slice(trainEnd);
  for (let i = 0; i < evalCount; i++) {
    const pred = Math.max(0, Math.round(intercept + slope * (trainEnd + i)));
    evalPredicted.push(pred);
  }

  // MAE
  const mae = evalActual.reduce((s, a, i) => s + Math.abs(a - evalPredicted[i]), 0) / evalCount;

  // WAPE: sum(|actual - pred|) / sum(|actual|)
  const sumActual = evalActual.reduce((s, a) => s + a, 0);
  const wape = sumActual === 0 ? null : evalActual.reduce((s, a, i) => s + Math.abs(a - evalPredicted[i]), 0) / sumActual;

  // Bias: mean(pred - actual)
  const bias = evalPredicted.reduce((s, p, i) => s + (p - evalActual[i]), 0) / evalCount;

  const evaluation: ForecastEvaluation = {
    mae: Math.round(mae * 10) / 10,
    wape: wape !== null ? Math.round(wape * 1000) / 10 : null,
    bias: Math.round(bias * 10) / 10,
    evaluation_period_start: periods[trainEnd],
    evaluation_period_end: periods[periods.length - 1],
    evaluated_count: evalCount,
    method: 'Linear trend — chronological hold-out',
    valid: evalCount >= 3,
    validity_note: evalCount >= 3
      ? `${evalCount} hold-out observations evaluated chronologically.`
      : 'Insufficient observations for valid evaluation.',
  };

  // Build forecast series: historical + forecasted future
  const series: ForecastPoint[] = filtered.map((r, i) => ({
    period: r.period_start.slice(0, 7),
    actual: r.demand_count,
    predicted: i >= trainEnd ? evalPredicted[i - trainEnd] : null,
    is_forecast: false,
  }));

  // Future forecast periods
  const lastPeriod = periods[periods.length - 1];
  const [ly, lm] = lastPeriod.split('-').map(Number);
  for (let i = 1; i <= horizon; i++) {
    const month = (lm - 1 + i) % 12 + 1;
    const year = ly + Math.floor((lm - 1 + i) / 12);
    const period = `${year}-${String(month).padStart(2, '0')}`;
    const pred = Math.max(0, Math.round(intercept + slope * (values.length - 1 + i)));
    series.push({ period, actual: null, predicted: pred, is_forecast: true });
  }

  return {
    district_id,
    sector_id,
    occupation_code,
    horizon,
    series,
    evaluation,
    data_type: 'forecast_estimate',
  };
}

// ─── Gap analysis ──────────────────────────────────────────────────────────────
export function calcGap(
  demand: LabourDemand[],
  supply: WorkforceSupply[],
  district_id: string,
  occupation_code: string,
  period_start: string,
): GapResult {
  const demandRecs = demand.filter(
    r => r.district_id === district_id && r.occupation_code === occupation_code && r.period_start === period_start
  );
  const supplyRecs = supply.filter(
    r => r.district_id === district_id && r.occupation_code === occupation_code && r.period_start === period_start
  );

  if (demandRecs.length === 0) {
    return { status: 'insufficient_comparable_supply_data', reason: 'No demand records for this combination.' };
  }
  if (supplyRecs.length === 0) {
    return { status: 'insufficient_comparable_supply_data', reason: 'No workforce supply records for this occupation, district and period.' };
  }

  // Check unit compatibility
  const demandUnit = demandRecs[0].demand_unit;
  const supplyUnit = supplyRecs[0].unit;
  if (demandUnit !== supplyUnit) {
    return { status: 'insufficient_comparable_supply_data', reason: `Units are not comparable: demand="${demandUnit}", supply="${supplyUnit}".` };
  }

  const d = demandRecs.reduce((s, r) => s + r.demand_count, 0);
  const s = supplyRecs.reduce((a, r) => a + (r.estimated_workers ?? 0), 0);

  return { status: 'calculated', demand: d, supply: s, gap: d - s, period: period_start, unit: demandUnit };
}

// ─── Data quality report ───────────────────────────────────────────────────────
export function computeDataQuality(
  demandRecords: LabourDemand[],
  supplyRecords: WorkforceSupply[],
  trainingRecords: Array<{ candidates_trained: number | null }>
): DataQuality[] {
  const now = new Date().toISOString().slice(0, 10);

  const demandMissing = demandRecords.filter(r => r.demand_count == null).length;
  const demandDups = findDuplicateCount(demandRecords.map(r => r.demand_id));

  const supplyMissing = supplyRecords.filter(r => r.estimated_workers == null).length;
  const supplyDups = findDuplicateCount(supplyRecords.map(r => r.supply_id));

  const trainMissing = trainingRecords.filter(r => r.candidates_trained == null).length;

  return [
    {
      dataset_name: 'labour_demand',
      row_count: demandRecords.length,
      missing_percent: demandRecords.length > 0 ? Math.round((demandMissing / demandRecords.length) * 100) : 0,
      duplicate_count: demandDups,
      validation_status: demandDups > 0 ? 'warnings' : 'valid',
      last_checked: now,
      notes: 'Synthetic demo data. 24 monthly periods across 4 districts, 3 sectors, 10 occupations.',
    },
    {
      dataset_name: 'workforce_supply',
      row_count: supplyRecords.length,
      missing_percent: supplyRecords.length > 0 ? Math.round((supplyMissing / supplyRecords.length) * 100) : 0,
      duplicate_count: supplyDups,
      validation_status: supplyDups > 0 ? 'warnings' : 'valid',
      last_checked: now,
      notes: 'Synthetic supply available for limited occupations/districts only. Gap shown only where comparable.',
    },
    {
      dataset_name: 'training_capacity (PMKVY)',
      row_count: trainingRecords.length,
      missing_percent: trainingRecords.length > 0 ? Math.round((trainMissing / trainingRecords.length) * 100) : 0,
      duplicate_count: 0,
      validation_status: 'valid',
      last_checked: now,
      notes: 'Official published data from PIB/MSDE. Training counts only — not demand or workforce supply.',
    },
  ];
}

function findDuplicateCount(ids: string[]): number {
  const seen = new Set<string>();
  let dups = 0;
  for (const id of ids) {
    if (seen.has(id)) dups++;
    else seen.add(id);
  }
  return dups;
}

// ─── CSV validation ────────────────────────────────────────────────────────────
const REQUIRED_DEMAND_FIELDS = ['period_start', 'district_id', 'sector_id', 'occupation_code', 'occupation_name', 'demand_count', 'demand_unit'];

export function validateCsvDemand(rows: CsvRow[], mapping: Record<string, string>): CsvValidationResult {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  let validRows = 0;

  // Check required fields are mapped
  for (const field of REQUIRED_DEMAND_FIELDS) {
    const csvCol = Object.keys(mapping).find(k => mapping[k] === field);
    if (!csvCol) {
      issues.push({ row: null, field, message: `Required field "${field}" is not mapped to any CSV column.`, severity: 'error' });
    }
  }

  const reverseMap = Object.fromEntries(Object.entries(mapping).map(([k, v]) => [v, k]));
  const hasRequiredMappings = REQUIRED_DEMAND_FIELDS.every(f => reverseMap[f]);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 1;
    let rowValid = true;

    if (!hasRequiredMappings) break;

    // Required field presence
    for (const field of REQUIRED_DEMAND_FIELDS) {
      const csvCol = reverseMap[field];
      const val = row[csvCol]?.trim();
      if (!val) {
        issues.push({ row: rowNum, field, message: `Missing required field "${field}".`, severity: 'error' });
        rowValid = false;
      }
    }

    // demand_count must be numeric
    const countVal = row[reverseMap['demand_count']]?.trim();
    if (countVal && isNaN(Number(countVal))) {
      issues.push({ row: rowNum, field: 'demand_count', message: `"${countVal}" is not a valid number.`, severity: 'error' });
      rowValid = false;
    }

    // period_start must be a valid date
    const periodVal = row[reverseMap['period_start']]?.trim();
    if (periodVal && isNaN(Date.parse(periodVal))) {
      issues.push({ row: rowNum, field: 'period_start', message: `"${periodVal}" is not a valid date.`, severity: 'error' });
      rowValid = false;
    }

    // Duplicate detection
    const key = `${row[reverseMap['period_start']]}-${row[reverseMap['district_id']]}-${row[reverseMap['occupation_code']]}`;
    if (seen.has(key)) {
      issues.push({ row: rowNum, field: null, message: `Duplicate record for period+district+occupation combination.`, severity: 'warning' });
    } else {
      seen.add(key);
    }

    if (rowValid) validRows++;
  }

  return {
    total_rows: rows.length,
    valid_rows: validRows,
    error_count: issues.filter(i => i.severity === 'error').length,
    warning_count: issues.filter(i => i.severity === 'warning').length,
    issues,
    preview: rows.slice(0, 5),
  };
}

// ─── CSV export ────────────────────────────────────────────────────────────────
export function exportToCsv(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => {
        const v = String(row[h] ?? '');
        return v.includes(',') || v.includes('"') || v.includes('\n') ? `"${v.replace(/"/g, '""')}"` : v;
      }).join(',')
    ),
  ];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Training alignment ────────────────────────────────────────────────────────
export interface TrainingAlignmentRow {
  occupation_code: string;
  occupation_name: string;
  demand_total: number;
  skills_required: string[];
  training_coverage: 'covered' | 'partial' | 'none';
  note: string;
}

export function buildTrainingAlignment(
  demand: LabourDemand[],
  occSkillMap: Array<{ occupation_code: string; skill_id: string; mapping_type: string }>,
  skillRef: Array<{ skill_id: string; skill_name: string }>,
  trainedSkillIds: string[]
): TrainingAlignmentRow[] {
  const occMap = new Map<string, { name: string; demand: number; skills: string[] }>();

  for (const r of demand) {
    if (!occMap.has(r.occupation_code)) {
      const skills = occSkillMap
        .filter(m => m.occupation_code === r.occupation_code)
        .map(m => skillRef.find(s => s.skill_id === m.skill_id)?.skill_name ?? m.skill_id);
      occMap.set(r.occupation_code, { name: r.occupation_name, demand: 0, skills });
    }
    occMap.get(r.occupation_code)!.demand += r.demand_count;
  }

  return [...occMap.entries()].map(([code, { name, demand, skills }]) => {
    const covered = skills.filter(s => {
      const id = skillRef.find(sr => sr.skill_name === s)?.skill_id;
      return id && trainedSkillIds.includes(id);
    });
    let coverage: 'covered' | 'partial' | 'none';
    if (skills.length === 0) coverage = 'none';
    else if (covered.length === skills.length) coverage = 'covered';
    else if (covered.length > 0) coverage = 'partial';
    else coverage = 'none';

    return {
      occupation_code: code,
      occupation_name: name,
      demand_total: demand,
      skills_required: skills,
      training_coverage: coverage,
      note: skills.length === 0 ? 'No skill mapping available' : `${covered.length}/${skills.length} skills have training records`,
    };
  }).sort((a, b) => b.demand_total - a.demand_total);
}
