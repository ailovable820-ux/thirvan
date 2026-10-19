import { ArrowRight, BarChart2, Upload, TrendingUp, FileText, AlertTriangle, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CAPABILITIES = [
  { icon: BarChart2, title: 'Demand Intelligence', desc: 'Explore monthly job-posting signals across districts, sectors and occupations in Tamil Nadu.' },
  { icon: Upload, title: 'CSV Data Upload', desc: 'Upload your own demand data with schema mapping, validation and row-level error reporting.' },
  { icon: TrendingUp, title: 'Baseline Forecasting', desc: 'Run chronologically-evaluated forecasts with honest MAE and WAPE metrics for 3, 6 or 12 months.' },
  { icon: FileText, title: 'Reports & Methodology', desc: 'Full source register, formulas, data-quality report and CSV exports — nothing hidden.' },
];

export function LandingPage() {
  const { setPage } = useApp();

  return (
    <div className="min-h-screen bg-navy-900 overflow-y-auto">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-teal-500 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 mb-6">
                <span className="text-teal-300 text-xs font-medium">SIH26246 — Prototype</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3">
                THIRVAN
              </h1>
              <p className="text-xl text-teal-300 font-medium mb-2">Skills Meet Opportunity</p>
              <p className="text-navy-200 text-base mb-4">AI-Powered Skill Intelligence</p>
              <p className="text-navy-300 text-base leading-relaxed max-w-xl mb-8">
                An AI-enabled labour market intelligence and skill demand–supply forecasting engine
                for Tamil Nadu, built for SIH26246. Transparent data, honest metrics, real calculations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => setPage('dashboard')}
                  className="btn-gold text-base px-6 py-3 shadow-lg"
                >
                  Explore Dashboard <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPage('reports')}
                  className="btn-secondary bg-transparent border-navy-400 text-navy-200 hover:bg-navy-700 text-base px-6 py-3"
                >
                  View Methodology
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src="/assets/images/Futuristic_India_Education_Emblem.png"
                alt="THIRVAN Logo"
                className="w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Synthetic data disclosure */}
      <div className="bg-gold-500/10 border-y border-gold-500/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <p className="text-gold-200 text-sm">
            <span className="font-semibold">Data disclosure:</span> This prototype combines{' '}
            <span className="text-gold-300 font-medium">official published PMKVY training data</span> (Tamil Nadu district-wise candidates trained, FY 2021–22 to 2023–24, sourced from PIB/MSDE) with{' '}
            <span className="text-gold-300 font-medium">synthetic demo data</span> for labour demand and workforce supply. All synthetic records, charts, KPIs and forecasts are clearly labelled. They are not official Tamil Nadu labour-market findings.
          </p>
        </div>
      </div>

      {/* Capabilities */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Key Capabilities</h2>
        <p className="text-navy-300 text-center mb-10">End-to-end workflow from data ingestion to forecasting</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map(cap => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="bg-navy-800/60 border border-navy-600 rounded-xl p-5 hover:border-teal-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">{cap.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problem statement */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-navy-800/40 border border-navy-600 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Problem Statement</h2>
          <p className="text-navy-200 leading-relaxed mb-6">
            India's skill ecosystem faces a persistent mismatch between labour market demand and workforce supply. Employers cannot find workers with the right skills; graduates cannot find jobs matching their training. Real-time, district-level intelligence on skill demand and supply is needed to guide training investment and policy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Pilot districts', value: '4 (Chennai, Coimbatore, Madurai, Tiruchirappalli)' },
              { label: 'Sectors covered', value: 'IT/Software · Manufacturing · Healthcare' },
              { label: 'Data transparency', value: 'Official + Synthetic clearly labelled' },
            ].map(item => (
              <div key={item.label} className="bg-navy-700/50 rounded-xl p-4">
                <p className="text-teal-400 text-xs font-medium uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-navy-700 py-6 text-center">
        <p className="text-navy-400 text-sm">THIRVAN © 2026 · SIH26246 · Pilot: Tamil Nadu</p>
        <a
          href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-teal-400 text-xs mt-1 hover:underline"
        >
          Official data source: PIB/MSDE PMKVY report <ExternalLink className="w-3 h-3" />
        </a>
      </footer>
    </div>
  );
}
