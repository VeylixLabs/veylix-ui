import React, { createContext, useContext, ReactNode } from 'react';
import '../style.css';

interface VeylixContextState {
  theme: 'dark' | 'light';
  network: 'mainnet' | 'testnet';
}

const VeylixContext = createContext<VeylixContextState | undefined>(undefined);

export interface VeylixProviderProps {
  children: ReactNode;
  theme?: 'dark' | 'light';
  network?: 'mainnet' | 'testnet';
}

export const VeylixProvider: React.FC<VeylixProviderProps> = ({ 
  children, 
  theme = 'dark',
  network = 'mainnet' 
}) => {
  return (
    <VeylixContext.Provider value={{ theme, network }}>
      <div className={theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}>
        {children}
      </div>
    </VeylixContext.Provider>
  );
};

export const useVeylix = () => {
  const context = useContext(VeylixContext);
  if (context === undefined) {
    throw new Error('useVeylix must be used within a VeylixProvider');
  }
  return context;
};
