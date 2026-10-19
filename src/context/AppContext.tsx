import React, { createContext, useContext, useState, useCallback } from 'react';
import type { LabourDemand, WorkforceSupply, FilterState } from '@/types';
import {
  LABOUR_DEMAND,
  WORKFORCE_SUPPLY,
  TRAINING_CAPACITY,
  DISTRICTS,
  OCCUPATIONS,
  SKILLS,
  OCCUPATION_SKILL_MAP,
} from '@/data/seeds';

interface AppContextValue {
  demandRecords: LabourDemand[];
  supplyRecords: WorkforceSupply[];
  addDemandRecords: (rows: LabourDemand[]) => void;
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  currentPage: Page;
  setPage: (p: Page) => void;
}

export type Page = 'landing' | 'dashboard' | 'data' | 'forecast' | 'reports';

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [demandRecords, setDemandRecords] = useState<LabourDemand[]>(LABOUR_DEMAND);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [filters, setFilters] = useState<FilterState>({
    district: '',
    sector: '',
    occupation: '',
    skill: '',
    period_start: '',
    period_end: '',
  });

  const addDemandRecords = useCallback((rows: LabourDemand[]) => {
    setDemandRecords(prev => [...prev, ...rows]);
  }, []);

  const setPage = useCallback((p: Page) => setCurrentPage(p), []);

  return (
    <AppContext.Provider value={{
      demandRecords,
      supplyRecords: WORKFORCE_SUPPLY,
      addDemandRecords,
      filters,
      setFilters,
      currentPage,
      setPage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export {
  TRAINING_CAPACITY,
  DISTRICTS,
  OCCUPATIONS,
  SKILLS,
  OCCUPATION_SKILL_MAP,
};
