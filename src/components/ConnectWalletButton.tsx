import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { cn } from '../lib/utils';

export interface ConnectWalletButtonProps {
  label?: string;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ 
  label = "Connect Wallet",
  className
}) => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      if (connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
    }
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <button 
      onClick={handleConnect}
      className={cn(
        "relative px-6 py-2 rounded-lg font-display uppercase tracking-widest text-sm font-bold text-white transition-all duration-300",
        "bg-[rgba(10,10,10,0.7)] border border-[rgba(255,255,255,0.2)] backdrop-blur-xs",
        "hover:border-primaryColorLight hover:shadow-glow-purple",
        isConnected ? "border-green-500/50 shadow-glow-green" : "",
        className
      )}
    >
      {/* Subtle glowing accent dot */}
      <span className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
        isConnected ? "bg-green-400 animate-pulse" : "bg-primaryColor"
      )} />
      <span className="pl-4">
        {isConnected ? displayAddress : label}
      </span>
    </button>
  );
};
