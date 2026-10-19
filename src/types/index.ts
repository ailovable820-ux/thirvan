// ─── Data type labels ──────────────────────────────────────────────────────────
export type DataType =
  | 'official_published'
  | 'synthetic_demo'
  | 'derived_calculation'
  | 'forecast_estimate'
  | 'insufficient_data';

export const DATA_TYPE_LABELS: Record<DataType, string> = {
  official_published: 'Official Published Data',
  synthetic_demo: 'Synthetic Demo Data',
  derived_calculation: 'Derived Calculation',
  forecast_estimate: 'Forecast Estimate',
  insufficient_data: 'Insufficient Data',
};

// ─── Reference tables ──────────────────────────────────────────────────────────
export interface DistrictReference {
  district_id: string;
  district_name: string;
  state_name: string;
  boundary_source: string | null;
  boundary_license: string | null;
  geometry_id: string | null;
}

export interface OccupationReference {
  occupation_code: string;
  occupation_name: string;
  sector_id: string;
  description: string;
  nco_edition: string;
  source_url: string;
}

export interface SkillReference {
  skill_id: string;
  skill_name: string;
  skill_category: string;
  aliases: string[];
  source_url: string | null;
}

export interface OccupationSkillMap {
  occupation_code: string;
  skill_id: string;
  mapping_type: 'explicit' | 'inferred';
  mapping_source: string;
  confidence: 'high' | 'medium' | 'low';
}

// ─── Core datasets ─────────────────────────────────────────────────────────────
export interface LabourDemand {
  demand_id: string;
  period_start: string;   // ISO date YYYY-MM-DD
  period_end: string;
  district_id: string;
  sector_id: string;
  occupation_code: string;
  occupation_name: string;
  skill_id: string | null;
  demand_count: number;
  demand_unit: 'job_postings';
  source_name: string;
  source_url: string | null;
  extraction_date: string;
  data_type: DataType;
  confidence_note: string | null;
}

export interface WorkforceSupply {
  supply_id: string;
  period_start: string;
  district_id: string;
  occupation_code: string;
  estimated_workers: number | null;
  unit: string;
  source_name: string;
  source_url: string | null;
  data_type: DataType;
  estimation_method: string | null;
  confidence_note: string | null;
}

export interface TrainingCapacity {
  training_id: string;
  period_start: string;
  district_id: string;
  provider_id: string;
  course_id: string;
  course_name: string;
  occupation_code: string | null;
  skill_id: string | null;
  seats_available: number | null;
  enrolments: number | null;
  candidates_trained: number | null;
  completions: number | null;
  placements: number | null;
  source_name: string;
  source_url: string;
  data_type: DataType;
}

// ─── Data quality ──────────────────────────────────────────────────────────────
export interface DataQuality {
  dataset_name: string;
  row_count: number;
  missing_percent: number;
  duplicate_count: number;
  validation_status: 'valid' | 'warnings' | 'errors';
  last_checked: string;
  notes: string;
}

// ─── Forecast types ────────────────────────────────────────────────────────────
export interface ForecastPoint {
  period: string;
  actual: number | null;
  predicted: number | null;
  is_forecast: boolean;
}

export interface ForecastEvaluation {
  mae: number | null;
  wape: number | null;
  bias: number | null;
  evaluation_period_start: string;
  evaluation_period_end: string;
  evaluated_count: number;
  method: string;
  valid: boolean;
  validity_note: string;
}

export interface ForecastResult {
  district_id: string;
  sector_id: string;
  occupation_code: string;
  horizon: 3 | 6 | 12;
  series: ForecastPoint[];
  evaluation: ForecastEvaluation;
  data_type: DataType;
}

// ─── Gap analysis ──────────────────────────────────────────────────────────────
export type GapResult =
  | { status: 'calculated'; demand: number; supply: number; gap: number; period: string; unit: string }
  | { status: 'insufficient_comparable_supply_data'; reason: string };

// ─── CSV upload ────────────────────────────────────────────────────────────────
export interface CsvRow {
  [key: string]: string;
}

export interface ColumnMapping {
  csvColumn: string;
  targetField: string | null;
}

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  row: number | null;
  field: string | null;
  message: string;
  severity: ValidationSeverity;
}

export interface CsvValidationResult {
  total_rows: number;
  valid_rows: number;
  error_count: number;
  warning_count: number;
  issues: ValidationIssue[];
  preview: CsvRow[];
}

// ─── Filter state ──────────────────────────────────────────────────────────────
export interface FilterState {
  district: string;
  sector: string;
  occupation: string;
  skill: string;
  period_start: string;
  period_end: string;
}

// ─── Source register entry ─────────────────────────────────────────────────────
export interface SourceEntry {
  id: string;
  name: string;
  description: string;
  url: string;
  data_type: DataType;
  coverage: string;
}
