import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { cn } from '../lib/utils';

export interface ConnectWalletButtonProps {
  label?: string;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  label = 'Select wallet',
  className,
}) => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
      return;
    }

    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <button
      type="button"
      onClick={handleConnect}
      title={isConnected ? 'Disconnect wallet' : label}
      className={cn(
        isConnected
          ? [
              'inline-flex min-h-10 items-center gap-3 rounded-lg',
              'border border-[var(--border-active)] bg-white/[0.035] px-3',
              'font-tech text-[11px] text-white/85 transition-all',
              'hover:bg-white/[0.055] hover:shadow-[0_0_18px_rgba(170,98,245,0.12)]',
            ]
          : 'vey-wallet-button px-5 text-[10px]',
        className,
      )}
    >
      <span
        className={cn(
          'relative flex h-2.5 w-2.5 shrink-0 rounded-full',
          isConnected
            ? 'bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]'
            : 'bg-[var(--accent)]',
        )}
        data-testid="wallet-status-dot"
        aria-hidden="true"
      >
        {isConnected && (
          <span className="absolute inset-0 rounded-full bg-emerald-300/40 animate-ping" />
        )}
      </span>

      <span className="relative z-10">
        {isConnected ? displayAddress : label}
      </span>

      {!isConnected && (
        <span aria-hidden="true" className="relative z-10 text-base leading-none">
          -&gt;
        </span>
      )}
    </button>
  );
};
