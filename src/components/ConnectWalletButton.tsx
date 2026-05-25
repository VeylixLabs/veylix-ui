import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export interface ConnectWalletButtonProps {
  label?: string;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ 
  label = "Connect Wallet",
  className = ""
}) => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      // Connect with the first available connector (usually injected/Metamask)
      if (connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
    }
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <button 
      onClick={handleConnect}
      className={`px-4 py-2 rounded-lg font-bold text-white transition-colors duration-200 ${
        isConnected ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {isConnected ? displayAddress : label}
    </button>
  );
};
