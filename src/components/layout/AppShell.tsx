import { LayoutDashboard, Database, TrendingUp, FileText, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp, type Page } from '@/context/AppContext';

const NAV_ITEMS: { id: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'data', label: 'Data & Demand', icon: Database },
  { id: 'forecast', label: 'Forecast & Skill Gaps', icon: TrendingUp },
  { id: 'reports', label: 'Reports & Methodology', icon: FileText },
];

import React from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentPage, setPage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 flex flex-col transition-transform duration-200
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-700">
          <img src="/assets/images/Futuristic_India_Education_Emblem.png" alt="THIRVAN Logo" className="h-10 w-10 object-contain flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight">THIRVAN</h1>
            <p className="text-teal-300 text-xs truncate">Skills Meet Opportunity</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors
                  ${active
                    ? 'bg-teal-500 text-white'
                    : 'text-navy-200 hover:bg-navy-700 hover:text-white'
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {active && <ChevronRight className="w-3 h-3" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-navy-700">
          <p className="text-xs text-navy-400">SIH26246 • Prototype</p>
          <p className="text-xs text-gold-400 mt-0.5">Contains synthetic demo data</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-navy-100 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-navy-600 hover:bg-navy-50">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <img src="/assets/images/Futuristic_India_Education_Emblem.png" alt="" className="h-7 w-7 object-contain" />
            <span className="font-bold text-navy-900">THIRVAN</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
