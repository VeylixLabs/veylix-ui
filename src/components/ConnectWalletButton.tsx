import React from 'react';

export interface ConnectWalletButtonProps {
  onClick?: () => void;
  label?: string;
  isConnected?: boolean;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onClick, label = "Connect Wallet", isConnected = false }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-bold text-white transition-colors duration-200 ${
        isConnected ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isConnected ? "Connected" : label}
    </button>
  );
};
