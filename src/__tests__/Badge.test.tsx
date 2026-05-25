import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge } from '../components/Badge';

describe('Badge', () => {
  // ── Basic rendering ─────────────────────────────────────────────────

  it('renders children text', () => {
    render(<Badge>Hello VEYLIX</Badge>);
    expect(screen.getByText('Hello VEYLIX')).toBeInTheDocument();
  });

  // ── Variant classes ─────────────────────────────────────────────────

  it('applies variant classes', () => {
    const variants = [
      { variant: 'default' as const, expectedFragment: 'bg-white/5' },
      { variant: 'success' as const, expectedFragment: 'bg-green-400/10' },
      { variant: 'warning' as const, expectedFragment: 'bg-amber-400/10' },
      { variant: 'error' as const, expectedFragment: 'bg-red-400/10' },
      { variant: 'info' as const, expectedFragment: 'bg-blue-400/10' },
      { variant: 'accent' as const, expectedFragment: 'bg-[rgba(170,98,245,0.1)]' },
    ];

    for (const { variant, expectedFragment } of variants) {
      const { unmount } = render(<Badge variant={variant}>V</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge.className).toContain(expectedFragment);
      unmount();
    }
  });

  // ── Dot indicator ───────────────────────────────────────────────────

  it('renders dot indicator when dot=true', () => {
    const { rerender } = render(<Badge>No Dot</Badge>);
    expect(screen.queryByTestId('badge-dot')).not.toBeInTheDocument();

    rerender(<Badge dot>Has Dot</Badge>);
    expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
  });

  // ── Status presets ──────────────────────────────────────────────────

  it('status preset applies correct styling', () => {
    // "connected" → green variant, dot, glow
    const { unmount: u1 } = render(<Badge status="connected">Online</Badge>);
    let badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-green-400/10');
    expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
    u1();

    // "pending" → amber variant, pulsing dot
    const { unmount: u2 } = render(<Badge status="pending">Waiting</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-amber-400/10');
    const dot = screen.getByTestId('badge-dot');
    expect(dot.className).toContain('animate-pulse');
    u2();

    // "verified" → green with ✓ prefix, no dot
    const { unmount: u3 } = render(<Badge status="verified">Verified</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-green-400/10');
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.queryByTestId('badge-dot')).not.toBeInTheDocument();
    u3();

    // "error" → red with ⚠ prefix
    render(<Badge status="error">Failed</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-red-400/10');
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  // ── Network presets ─────────────────────────────────────────────────

  it('network preset applies correct styling', () => {
    const { unmount: u1 } = render(<Badge network="base">Base</Badge>);
    let badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-blue-500/10');
    expect(badge.className).toContain('text-blue-400');
    u1();

    const { unmount: u2 } = render(<Badge network="base-sepolia">Sepolia</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-orange-400/10');
    expect(badge.className).toContain('text-orange-400');
    u2();

    render(<Badge network="ethereum">Ethereum</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-indigo-400/10');
    expect(badge.className).toContain('text-indigo-400');
  });

  // ── Size variants ──────────────────────────────────────────────────

  it('size variants apply correct classes', () => {
    const sizes = [
      { size: 'sm' as const, expected: 'text-xs' },
      { size: 'md' as const, expected: 'text-sm' },
      { size: 'lg' as const, expected: 'text-base' },
    ];

    for (const { size, expected } of sizes) {
      const { unmount } = render(<Badge size={size}>S</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge.className).toContain(expected);
      unmount();
    }
  });
});
