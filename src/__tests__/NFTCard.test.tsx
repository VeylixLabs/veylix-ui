import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { NFTCard } from '../components/NFTCard';

describe('NFTCard', () => {
  const defaultProps = {
    id: 'asset-001',
    name: 'Synthetic A1 H100 GPU',
    price: '0.75',
    creator: 'VEYLIX Foundry',
  };

  it('uses the dApp card primitive and renders asset metadata', () => {
    render(<NFTCard {...defaultProps} image="/asset.png" verified />);

    expect(screen.getByTestId('nft-card').className).toContain('card-veylix');
    expect(screen.getByText('Synthetic A1 H100 GPU')).toBeInTheDocument();
    expect(screen.getByText('by VEYLIX Foundry')).toBeInTheDocument();
    expect(screen.getByText('0.75 ETH')).toBeInTheDocument();
    expect(screen.getByText('VERIFIED')).toBeInTheDocument();
    expect(screen.getByText('3D')).toBeInTheDocument();
  });

  it('renders a VEYLIX-style empty preview when image is missing', () => {
    render(<NFTCard {...defaultProps} />);

    expect(screen.getByText('NO PREVIEW')).toBeInTheDocument();
    expect(screen.getByTestId('nft-empty-preview').className).toContain(
      'bg-[radial-gradient(circle_at_50%_50%,rgba(170,98,245,0.08),transparent_70%)]',
    );
  });

  it('calls onBuy from the acquire action', () => {
    const onBuy = vi.fn();
    render(<NFTCard {...defaultProps} onBuy={onBuy} />);

    fireEvent.click(screen.getByRole('button', { name: /acquire asset/i }));

    expect(onBuy).toHaveBeenCalledTimes(1);
  });
});
