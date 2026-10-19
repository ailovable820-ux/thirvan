import { AppProvider, useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';

function AppContent() {
  const { currentPage } = useApp();

  if (currentPage === 'landing') return <LandingPage />;

  return (
    <AppShell>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'data' && <Dashboard />}
      {currentPage === 'forecast' && <Dashboard />}
      {currentPage === 'reports' && <Dashboard />}
    </AppShell>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
