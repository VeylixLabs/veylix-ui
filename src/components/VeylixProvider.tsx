import React, { createContext, useContext, ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
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

const queryClient = new QueryClient();

export const VeylixProvider: React.FC<VeylixProviderProps> = ({ 
  children, 
  theme = 'dark',
  network = 'mainnet' 
}) => {

  const wagmiConfig = createConfig({
    chains: network === 'mainnet' ? [base] : [baseSepolia],
    connectors: [
      injected()
    ],
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <VeylixContext.Provider value={{ theme, network }}>
          <div className={theme === 'dark' ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
            {children}
          </div>
        </VeylixContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useVeylix = () => {
  const context = useContext(VeylixContext);
  if (context === undefined) {
    throw new Error('useVeylix must be used within a VeylixProvider');
  }
  return context;
};
