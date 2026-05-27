import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ConnectWalletButton } from '../components/ConnectWalletButton';

const connect = vi.fn();
const disconnect = vi.fn();
let mockAccount = {
  isConnected: false,
  address: undefined as string | undefined,
};
let mockConnectors = [{ id: 'injected', name: 'MetaMask' }];

vi.mock('wagmi', () => ({
  useAccount: () => mockAccount,
  useConnect: () => ({
    connectors: mockConnectors,
    connect,
  }),
  useDisconnect: () => ({
    disconnect,
  }),
}));

describe('ConnectWalletButton', () => {
  beforeEach(() => {
    connect.mockClear();
    disconnect.mockClear();
    mockAccount = {
      isConnected: false,
      address: undefined,
    };
    mockConnectors = [{ id: 'injected', name: 'MetaMask' }];
  });

  it('uses the dApp wallet button visual primitive when disconnected', () => {
    render(<ConnectWalletButton label="Select wallet" />);

    const button = screen.getByRole('button', { name: /select wallet/i });
    expect(button.className).toContain('vey-wallet-button');
    expect(screen.getByTestId('wallet-status-dot').className).toContain('bg-[var(--accent)]');
  });

  it('connects with the first connector when disconnected', () => {
    render(<ConnectWalletButton />);

    fireEvent.click(screen.getByRole('button'));

    expect(connect).toHaveBeenCalledWith({ connector: mockConnectors[0] });
    expect(disconnect).not.toHaveBeenCalled();
  });

  it('shows the connected address and disconnects when connected', () => {
    mockAccount = {
      isConnected: true,
      address: '0x1234567890abcdef1234567890abcdef12345678',
    };

    render(<ConnectWalletButton />);

    const button = screen.getByRole('button', { name: /0x1234\.\.\.5678/i });
    expect(button.className).toContain('border-[var(--border-active)]');
    expect(screen.getByTestId('wallet-status-dot').className).toContain('bg-emerald-300');

    fireEvent.click(button);

    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(connect).not.toHaveBeenCalled();
  });
});
