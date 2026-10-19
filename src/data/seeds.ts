import type {
  DistrictReference,
  OccupationReference,
  SkillReference,
  OccupationSkillMap,
  TrainingCapacity,
  LabourDemand,
  WorkforceSupply,
  SourceEntry,
} from '@/types';

// ─── Districts ─────────────────────────────────────────────────────────────────
export const DISTRICTS: DistrictReference[] = [
  { district_id: 'CHE', district_name: 'Chennai', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'CBE', district_name: 'Coimbatore', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'MDU', district_name: 'Madurai', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TRY', district_name: 'Tiruchirappalli', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TPR', district_name: 'Tiruppur', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'SLM', district_name: 'Salem', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TVR', district_name: 'Thiruvallur', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'KAN', district_name: 'Kanchipuram', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'VLR', district_name: 'Vellore', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TVN', district_name: 'Tiruvannamalai', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'CDL', district_name: 'Cuddalore', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'ERD', district_name: 'Erode', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'DGL', district_name: 'Dindigul', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TNL', district_name: 'Tirunelveli', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'VDN', district_name: 'Virudhunagar', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'ARL', district_name: 'Ariyalur', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'KLK', district_name: 'Kallakurichi', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'TNK', district_name: 'Tenkasi', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'NGP', district_name: 'Nagapattinam', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
  { district_id: 'NMK', district_name: 'Namakkal', state_name: 'Tamil Nadu', boundary_source: null, boundary_license: null, geometry_id: null },
];

export const PILOT_DISTRICT_IDS = ['CHE', 'CBE', 'MDU', 'TRY'];
export const SECTORS = ['IT/Software', 'Manufacturing', 'Healthcare'] as const;
export type Sector = typeof SECTORS[number];

// ─── Occupations ───────────────────────────────────────────────────────────────
export const OCCUPATIONS: OccupationReference[] = [
  { occupation_code: 'NCO-2514', occupation_name: 'Software Developer', sector_id: 'IT/Software', description: 'Designs, codes and tests software applications', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-2521', occupation_name: 'Data Analyst', sector_id: 'IT/Software', description: 'Analyses data using statistical tools and visualisation', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-2529', occupation_name: 'Cybersecurity Analyst', sector_id: 'IT/Software', description: 'Protects information systems and networks from cyber threats', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-2519', occupation_name: 'AI/ML Engineer', sector_id: 'IT/Software', description: 'Develops machine learning models and AI systems', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-3513', occupation_name: 'IT Support Technician', sector_id: 'IT/Software', description: 'Provides technical support and maintenance for IT systems', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-7421', occupation_name: 'Electronics Technician', sector_id: 'Manufacturing', description: 'Installs and repairs electronic equipment and assemblies', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-7233', occupation_name: 'Mechanical Technician', sector_id: 'Manufacturing', description: 'Maintains and repairs mechanical machinery and equipment', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-3122', occupation_name: 'Production Supervisor', sector_id: 'Manufacturing', description: 'Supervises workers in manufacturing and production processes', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-2221', occupation_name: 'Nurse', sector_id: 'Healthcare', description: 'Provides nursing care and medical assistance to patients', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
  { occupation_code: 'NCO-3212', occupation_name: 'Medical Laboratory Technician', sector_id: 'Healthcare', description: 'Performs laboratory tests and analyses biological samples', nco_edition: 'NCO-2015', source_url: 'https://www.dge.gov.in/national_classification_of_occupations' },
];

// ─── Skills ────────────────────────────────────────────────────────────────────
export const SKILLS: SkillReference[] = [
  { skill_id: 'SKL-001', skill_name: 'Python', skill_category: 'Programming', aliases: ['Python 3', 'Python programming'], source_url: null },
  { skill_id: 'SKL-002', skill_name: 'SQL', skill_category: 'Data', aliases: ['SQL querying', 'database querying'], source_url: null },
  { skill_id: 'SKL-003', skill_name: 'Data Analysis', skill_category: 'Data', aliases: ['data analytics', 'statistical analysis'], source_url: null },
  { skill_id: 'SKL-004', skill_name: 'Cloud Computing', skill_category: 'Infrastructure', aliases: ['cloud', 'AWS', 'Azure', 'GCP'], source_url: null },
  { skill_id: 'SKL-005', skill_name: 'Cybersecurity', skill_category: 'Security', aliases: ['information security', 'network security'], source_url: null },
  { skill_id: 'SKL-006', skill_name: 'Machine Learning', skill_category: 'AI/ML', aliases: ['ML', 'deep learning', 'AI'], source_url: null },
  { skill_id: 'SKL-007', skill_name: 'Electronics', skill_category: 'Engineering', aliases: ['electronic circuits', 'PCB'], source_url: null },
  { skill_id: 'SKL-008', skill_name: 'CAD', skill_category: 'Engineering', aliases: ['computer-aided design', 'AutoCAD', 'SolidWorks'], source_url: null },
  { skill_id: 'SKL-009', skill_name: 'Quality Control', skill_category: 'Manufacturing', aliases: ['QC', 'quality assurance', 'QA'], source_url: null },
  { skill_id: 'SKL-010', skill_name: 'Communication', skill_category: 'Soft Skills', aliases: ['communication skills', 'interpersonal'], source_url: null },
  { skill_id: 'SKL-011', skill_name: 'Clinical/Lab Skills', skill_category: 'Healthcare', aliases: ['clinical skills', 'laboratory skills'], source_url: null },
];

// ─── Occupation-skill mapping ──────────────────────────────────────────────────
export const OCCUPATION_SKILL_MAP: OccupationSkillMap[] = [
  { occupation_code: 'NCO-2514', skill_id: 'SKL-001', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2514', skill_id: 'SKL-004', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2514', skill_id: 'SKL-010', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-2521', skill_id: 'SKL-002', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2521', skill_id: 'SKL-003', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2521', skill_id: 'SKL-001', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2529', skill_id: 'SKL-005', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2529', skill_id: 'SKL-004', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-2519', skill_id: 'SKL-006', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2519', skill_id: 'SKL-001', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2519', skill_id: 'SKL-003', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-3513', skill_id: 'SKL-004', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'medium' },
  { occupation_code: 'NCO-3513', skill_id: 'SKL-010', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-7421', skill_id: 'SKL-007', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-7421', skill_id: 'SKL-009', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-7233', skill_id: 'SKL-008', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-7233', skill_id: 'SKL-009', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-3122', skill_id: 'SKL-009', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-3122', skill_id: 'SKL-010', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-2221', skill_id: 'SKL-011', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-2221', skill_id: 'SKL-010', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'medium' },
  { occupation_code: 'NCO-3212', skill_id: 'SKL-011', mapping_type: 'explicit', mapping_source: 'NCS job descriptions', confidence: 'high' },
  { occupation_code: 'NCO-3212', skill_id: 'SKL-002', mapping_type: 'inferred', mapping_source: 'Sector analysis', confidence: 'low' },
];

// ─── PMKVY training data (official published — historical training counts only) ─
// Source: PIB / Ministry of Skill Development and Entrepreneurship
// https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499
// These are candidates trained counts, NOT labour demand or workforce supply.
const PMKVY_RAW: Array<{ district_id: string; fy_2122: number | null; fy_2223: number | null; fy_2324: number | null }> = [
  { district_id: 'CHE', fy_2122: 3591, fy_2223: 1427, fy_2324: 3680 },
  { district_id: 'CBE', fy_2122: 1628, fy_2223: 574,  fy_2324: 2922 },
  { district_id: 'MDU', fy_2122: 524,  fy_2223: 560,  fy_2324: 840 },
  { district_id: 'TRY', fy_2122: 675,  fy_2223: 172,  fy_2324: 1552 },
  { district_id: 'TPR', fy_2122: 393,  fy_2223: 270,  fy_2324: 50 },
  { district_id: 'SLM', fy_2122: 490,  fy_2223: 0,    fy_2324: 613 },
  { district_id: 'TVR', fy_2122: 3013, fy_2223: 396,  fy_2324: 2648 },
  { district_id: 'KAN', fy_2122: 2634, fy_2223: 35,   fy_2324: 1204 },
  { district_id: 'VLR', fy_2122: 1745, fy_2223: 615,  fy_2324: 1422 },
  { district_id: 'TVN', fy_2122: 948,  fy_2223: 132,  fy_2324: 2936 },
  { district_id: 'CDL', fy_2122: 1141, fy_2223: 288,  fy_2324: 937 },
  { district_id: 'ERD', fy_2122: 1065, fy_2223: 260,  fy_2324: 1215 },
  { district_id: 'DGL', fy_2122: 1451, fy_2223: 285,  fy_2324: 625 },
  { district_id: 'TNL', fy_2122: 326,  fy_2223: 0,    fy_2324: 812 },
  { district_id: 'VDN', fy_2122: 382,  fy_2223: 152,  fy_2324: 598 },
  { district_id: 'ARL', fy_2122: 805,  fy_2223: 0,    fy_2324: 480 },
  { district_id: 'KLK', fy_2122: 0,    fy_2223: 20,   fy_2324: 0 },
  { district_id: 'TNK', fy_2122: 0,    fy_2223: 0,    fy_2324: 25 },
  { district_id: 'NGP', fy_2122: 297,  fy_2223: 467,  fy_2324: 880 },
  { district_id: 'NMK', fy_2122: 674,  fy_2223: 261,  fy_2324: 1800 },
];

export const TRAINING_CAPACITY: TrainingCapacity[] = PMKVY_RAW.flatMap((row, i) => {
  const periods: Array<{ fy: string; start: string; candidates: number | null }> = [
    { fy: '2021-22', start: '2021-04-01', candidates: row.fy_2122 },
    { fy: '2022-23', start: '2022-04-01', candidates: row.fy_2223 },
    { fy: '2023-24', start: '2023-04-01', candidates: row.fy_2324 },
  ];
  return periods.map((p, j) => ({
    training_id: `TC-${String(i + 1).padStart(3, '0')}-${j + 1}`,
    period_start: p.start,
    district_id: row.district_id,
    provider_id: 'PMKVY',
    course_id: 'PMKVY-ALL',
    course_name: 'PMKVY — All courses (district aggregate)',
    occupation_code: null,
    skill_id: null,
    seats_available: null,
    enrolments: null,
    candidates_trained: p.candidates,
    completions: null,
    placements: null,
    source_name: 'PIB / Ministry of Skill Development and Entrepreneurship',
    source_url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499',
    data_type: 'official_published' as const,
  }));
});

// ─── Synthetic demand generator (deterministic, fixed seed) ───────────────────
// SYNTHETIC DEMO DATA — not official Tamil Nadu labour-market findings
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

interface DemandConfig {
  district_id: string;
  occupation_code: string;
  sector_id: string;
  base: number;
  trend: number;      // monthly additive trend
  amplitude: number;  // seasonal amplitude
  seed: number;
}

const DEMAND_CONFIGS: DemandConfig[] = [
  // Chennai IT/Software
  { district_id: 'CHE', occupation_code: 'NCO-2514', sector_id: 'IT/Software',     base: 420, trend: 5,  amplitude: 40, seed: 101 },
  { district_id: 'CHE', occupation_code: 'NCO-2521', sector_id: 'IT/Software',     base: 280, trend: 4,  amplitude: 25, seed: 102 },
  { district_id: 'CHE', occupation_code: 'NCO-2529', sector_id: 'IT/Software',     base: 150, trend: 3,  amplitude: 15, seed: 103 },
  { district_id: 'CHE', occupation_code: 'NCO-2519', sector_id: 'IT/Software',     base: 200, trend: 6,  amplitude: 20, seed: 104 },
  { district_id: 'CHE', occupation_code: 'NCO-3513', sector_id: 'IT/Software',     base: 180, trend: 2,  amplitude: 18, seed: 105 },
  // Chennai Manufacturing
  { district_id: 'CHE', occupation_code: 'NCO-7421', sector_id: 'Manufacturing',  base: 130, trend: 1,  amplitude: 20, seed: 106 },
  { district_id: 'CHE', occupation_code: 'NCO-7233', sector_id: 'Manufacturing',  base: 110, trend: 1,  amplitude: 15, seed: 107 },
  { district_id: 'CHE', occupation_code: 'NCO-3122', sector_id: 'Manufacturing',  base: 90,  trend: 1,  amplitude: 12, seed: 108 },
  // Chennai Healthcare
  { district_id: 'CHE', occupation_code: 'NCO-2221', sector_id: 'Healthcare',     base: 160, trend: 3,  amplitude: 10, seed: 109 },
  { district_id: 'CHE', occupation_code: 'NCO-3212', sector_id: 'Healthcare',     base: 100, trend: 2,  amplitude: 8,  seed: 110 },
  // Coimbatore IT/Software
  { district_id: 'CBE', occupation_code: 'NCO-2514', sector_id: 'IT/Software',    base: 200, trend: 3,  amplitude: 22, seed: 201 },
  { district_id: 'CBE', occupation_code: 'NCO-2521', sector_id: 'IT/Software',    base: 140, trend: 2,  amplitude: 15, seed: 202 },
  { district_id: 'CBE', occupation_code: 'NCO-2529', sector_id: 'IT/Software',    base: 70,  trend: 2,  amplitude: 8,  seed: 203 },
  { district_id: 'CBE', occupation_code: 'NCO-2519', sector_id: 'IT/Software',    base: 90,  trend: 3,  amplitude: 10, seed: 204 },
  { district_id: 'CBE', occupation_code: 'NCO-3513', sector_id: 'IT/Software',    base: 80,  trend: 1,  amplitude: 10, seed: 205 },
  // Coimbatore Manufacturing
  { district_id: 'CBE', occupation_code: 'NCO-7421', sector_id: 'Manufacturing',  base: 210, trend: 2,  amplitude: 30, seed: 206 },
  { district_id: 'CBE', occupation_code: 'NCO-7233', sector_id: 'Manufacturing',  base: 190, trend: 2,  amplitude: 25, seed: 207 },
  { district_id: 'CBE', occupation_code: 'NCO-3122', sector_id: 'Manufacturing',  base: 150, trend: 1,  amplitude: 20, seed: 208 },
  // Coimbatore Healthcare
  { district_id: 'CBE', occupation_code: 'NCO-2221', sector_id: 'Healthcare',     base: 90,  trend: 2,  amplitude: 6,  seed: 209 },
  { district_id: 'CBE', occupation_code: 'NCO-3212', sector_id: 'Healthcare',     base: 55,  trend: 1,  amplitude: 4,  seed: 210 },
  // Madurai IT/Software
  { district_id: 'MDU', occupation_code: 'NCO-2514', sector_id: 'IT/Software',    base: 110, trend: 2,  amplitude: 12, seed: 301 },
  { district_id: 'MDU', occupation_code: 'NCO-2521', sector_id: 'IT/Software',    base: 80,  trend: 1,  amplitude: 8,  seed: 302 },
  { district_id: 'MDU', occupation_code: 'NCO-2529', sector_id: 'IT/Software',    base: 40,  trend: 1,  amplitude: 5,  seed: 303 },
  { district_id: 'MDU', occupation_code: 'NCO-2519', sector_id: 'IT/Software',    base: 50,  trend: 2,  amplitude: 6,  seed: 304 },
  { district_id: 'MDU', occupation_code: 'NCO-3513', sector_id: 'IT/Software',    base: 45,  trend: 1,  amplitude: 5,  seed: 305 },
  // Madurai Manufacturing
  { district_id: 'MDU', occupation_code: 'NCO-7421', sector_id: 'Manufacturing',  base: 120, trend: 1,  amplitude: 18, seed: 306 },
  { district_id: 'MDU', occupation_code: 'NCO-7233', sector_id: 'Manufacturing',  base: 100, trend: 1,  amplitude: 14, seed: 307 },
  { district_id: 'MDU', occupation_code: 'NCO-3122', sector_id: 'Manufacturing',  base: 80,  trend: 1,  amplitude: 10, seed: 308 },
  // Madurai Healthcare
  { district_id: 'MDU', occupation_code: 'NCO-2221', sector_id: 'Healthcare',     base: 110, trend: 2,  amplitude: 8,  seed: 309 },
  { district_id: 'MDU', occupation_code: 'NCO-3212', sector_id: 'Healthcare',     base: 70,  trend: 1,  amplitude: 5,  seed: 310 },
  // Tiruchirappalli IT/Software
  { district_id: 'TRY', occupation_code: 'NCO-2514', sector_id: 'IT/Software',    base: 130, trend: 2,  amplitude: 14, seed: 401 },
  { district_id: 'TRY', occupation_code: 'NCO-2521', sector_id: 'IT/Software',    base: 90,  trend: 2,  amplitude: 10, seed: 402 },
  { district_id: 'TRY', occupation_code: 'NCO-2529', sector_id: 'IT/Software',    base: 45,  trend: 1,  amplitude: 5,  seed: 403 },
  { district_id: 'TRY', occupation_code: 'NCO-2519', sector_id: 'IT/Software',    base: 60,  trend: 2,  amplitude: 7,  seed: 404 },
  { district_id: 'TRY', occupation_code: 'NCO-3513', sector_id: 'IT/Software',    base: 55,  trend: 1,  amplitude: 6,  seed: 405 },
  // Tiruchirappalli Manufacturing
  { district_id: 'TRY', occupation_code: 'NCO-7421', sector_id: 'Manufacturing',  base: 100, trend: 1,  amplitude: 15, seed: 406 },
  { district_id: 'TRY', occupation_code: 'NCO-7233', sector_id: 'Manufacturing',  base: 85,  trend: 1,  amplitude: 12, seed: 407 },
  { district_id: 'TRY', occupation_code: 'NCO-3122', sector_id: 'Manufacturing',  base: 70,  trend: 1,  amplitude: 9,  seed: 408 },
  // Tiruchirappalli Healthcare
  { district_id: 'TRY', occupation_code: 'NCO-2221', sector_id: 'Healthcare',     base: 95,  trend: 2,  amplitude: 7,  seed: 409 },
  { district_id: 'TRY', occupation_code: 'NCO-3212', sector_id: 'Healthcare',     base: 60,  trend: 1,  amplitude: 4,  seed: 410 },
];

// Start: January 2023, 24 monthly periods
const DEMAND_START_YEAR = 2023;
const DEMAND_START_MONTH = 1;
const DEMAND_PERIODS = 24;

function generatePeriodStart(idx: number): string {
  const d = new Date(DEMAND_START_YEAR, DEMAND_START_MONTH - 1 + idx, 1);
  return d.toISOString().slice(0, 10);
}

function generatePeriodEnd(idx: number): string {
  const d = new Date(DEMAND_START_YEAR, DEMAND_START_MONTH - 1 + idx + 1, 0);
  return d.toISOString().slice(0, 10);
}

export const LABOUR_DEMAND: LabourDemand[] = DEMAND_CONFIGS.flatMap((cfg) => {
  const rng = seededRandom(cfg.seed);
  return Array.from({ length: DEMAND_PERIODS }, (_, idx) => {
    const seasonalFactor = Math.sin((2 * Math.PI * (idx % 12)) / 12);
    const noise = (rng() - 0.5) * cfg.amplitude * 0.4;
    const raw = cfg.base + cfg.trend * idx + cfg.amplitude * seasonalFactor + noise;
    const count = Math.max(1, Math.round(raw));
    const occ = OCCUPATIONS.find(o => o.occupation_code === cfg.occupation_code);
    return {
      demand_id: `LD-${cfg.district_id}-${cfg.occupation_code}-${String(idx + 1).padStart(3, '0')}`,
      period_start: generatePeriodStart(idx),
      period_end: generatePeriodEnd(idx),
      district_id: cfg.district_id,
      sector_id: cfg.sector_id,
      occupation_code: cfg.occupation_code,
      occupation_name: occ?.occupation_name ?? cfg.occupation_code,
      skill_id: null,
      demand_count: count,
      demand_unit: 'job_postings' as const,
      source_name: 'Synthetic Demo Data — THIRVAN',
      source_url: null,
      extraction_date: '2024-12-01',
      data_type: 'synthetic_demo' as const,
      confidence_note: 'Deterministic synthetic generation for prototype demonstration. Not official labour-market data.',
    };
  });
});

// ─── Synthetic workforce supply (limited — gap only when comparable) ──────────
// Only IT/Software in Chennai and Coimbatore to demonstrate gap logic
const SUPPLY_CONFIGS = [
  { district_id: 'CHE', occupation_code: 'NCO-2514', base: 380, seed: 1001 },
  { district_id: 'CHE', occupation_code: 'NCO-2521', base: 220, seed: 1002 },
  { district_id: 'CBE', occupation_code: 'NCO-2514', base: 170, seed: 2001 },
  { district_id: 'CBE', occupation_code: 'NCO-7421', base: 180, seed: 2002 },
];

export const WORKFORCE_SUPPLY: WorkforceSupply[] = SUPPLY_CONFIGS.flatMap((cfg) => {
  const rng = seededRandom(cfg.seed);
  return Array.from({ length: DEMAND_PERIODS }, (_, idx) => {
    const noise = (rng() - 0.5) * cfg.base * 0.1;
    const count = Math.max(1, Math.round(cfg.base + noise + idx * 0.5));
    return {
      supply_id: `WS-${cfg.district_id}-${cfg.occupation_code}-${String(idx + 1).padStart(3, '0')}`,
      period_start: generatePeriodStart(idx),
      district_id: cfg.district_id,
      occupation_code: cfg.occupation_code,
      estimated_workers: count,
      unit: 'job_postings',
      source_name: 'Synthetic Demo Data — THIRVAN',
      source_url: null,
      data_type: 'synthetic_demo' as const,
      estimation_method: 'Synthetic generation for prototype demonstration',
      confidence_note: 'Comparable unit: job_postings. Not official workforce supply data.',
    };
  });
});

// ─── Source register ────────────────────────────────────────────────────────────
export const SOURCE_REGISTER: SourceEntry[] = [
  {
    id: 'S1',
    name: 'PIB / Ministry of Skill Development and Entrepreneurship',
    description: 'Tamil Nadu PMKVY district-wise candidates trained for 2021-22 to 2023-24. Training counts only.',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499',
    data_type: 'official_published',
    coverage: 'Tamil Nadu — 20 districts, FY 2021-22 to 2023-24',
  },
  {
    id: 'S2',
    name: 'Periodic Labour Force Survey catalogue',
    description: 'Official microdata catalogue; check survey variables and geographic sample support. Not integrated in prototype.',
    url: 'https://microdata.gov.in/NADA/index.php/catalog/PLFS',
    data_type: 'official_published',
    coverage: 'National; state-level indicators where supported',
  },
  {
    id: 'S3',
    name: 'National Classification of Occupations',
    description: 'Reference for occupation codes and titles (NCO-2015 edition).',
    url: 'https://www.dge.gov.in/national_classification_of_occupations',
    data_type: 'official_published',
    coverage: 'National occupation taxonomy',
  },
  {
    id: 'S4',
    name: 'National Career Service',
    description: 'Employment and career services portal. Bulk historical job data / API access must be confirmed before integration.',
    url: 'https://www.ncs.gov.in/',
    data_type: 'official_published',
    coverage: 'National; access/licence under review',
  },
  {
    id: 'S5',
    name: 'OGD India NCS catalogue',
    description: 'Catalogue lead for NCS data. Actual data fields, download/API and licence to be inspected.',
    url: 'https://punjab.data.gov.in/catalog/national-career-service-ncs',
    data_type: 'official_published',
    coverage: 'Catalogue only; fields unverified',
  },
  {
    id: 'S6',
    name: 'NSTI Chennai — course details',
    description: 'Published course name, duration, eligibility and seats for NSTI Chennai.',
    url: 'https://nstichennai.dgtmsde.in/ctsdetails.php',
    data_type: 'official_published',
    coverage: 'NSTI Chennai courses only',
  },
  {
    id: 'S7',
    name: 'NSTI Chennai — training calendar',
    description: 'Training calendar and curriculum links.',
    url: 'https://www.nstichennai.dgt.gov.in/en/training-calendar',
    data_type: 'official_published',
    coverage: 'NSTI Chennai calendar',
  },
  {
    id: 'S8',
    name: 'NIELIT aspirational district training',
    description: 'Programme-specific district training records; not a complete training census.',
    url: 'https://aspd-skill.nielit.gov.in/training-district.php?state=25',
    data_type: 'official_published',
    coverage: 'Selected aspirational districts in Tamil Nadu',
  },
  {
    id: 'S9',
    name: 'Tamil Nadu Skill Development Corporation',
    description: 'Example fields for course, sector, job role, duration and batch capacity.',
    url: 'https://portal.naanmudhalvan.tn.gov.in/pdfs/EOI_FORMAT-REVISED_FOR_APTITUDE.pdf',
    data_type: 'official_published',
    coverage: 'Naan Mudhalvan programme fields',
  },
];
