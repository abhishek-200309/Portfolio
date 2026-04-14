import { createContext, useContext, useState, type ReactNode } from 'react';

interface HeaderContextType {
  showDashboardFilters: boolean;
  setShowDashboardFilters: (show: boolean) => void;
  dashboardContent: ReactNode | null;
  setDashboardContent: (content: ReactNode | null) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showDashboardFilters, setShowDashboardFilters] = useState(false);
  const [dashboardContent, setDashboardContent] = useState<ReactNode | null>(null);

  return (
    <HeaderContext.Provider
      value={{
        showDashboardFilters,
        setShowDashboardFilters,
        dashboardContent,
        setDashboardContent,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
