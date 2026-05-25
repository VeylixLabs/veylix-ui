import React from 'react';
import { cn } from '../lib/utils';

// ── Variant colour maps ─────────────────────────────────────────────────────

/** Background, border, and text classes for each visual variant. */
const variantStyles = {
  default: 'bg-white/5 border-white/10 text-white/90',
  success: 'bg-green-400/10 border-green-400/30 text-green-400',
  warning: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
  error: 'bg-red-400/10 border-red-400/30 text-red-400',
  info: 'bg-blue-400/10 border-blue-400/30 text-blue-400',
  accent:
    'bg-[rgba(170,98,245,0.1)] border-[rgba(170,98,245,0.35)] text-[#d8b4fe]',
} as const;

/** Glow box-shadow per variant (applied when `glow` prop is true). */
const variantGlow = {
  default: 'shadow-[0_0_12px_rgba(255,255,255,0.08)]',
  success: 'shadow-[0_0_12px_rgba(74,222,128,0.25)]',
  warning: 'shadow-[0_0_12px_rgba(251,191,36,0.25)]',
  error: 'shadow-[0_0_12px_rgba(248,113,113,0.25)]',
  info: 'shadow-[0_0_12px_rgba(96,165,250,0.25)]',
  accent: 'shadow-[0_0_20px_rgba(170,98,245,0.25)]',
} as const;

/** Dot indicator colour per variant. */
const variantDot = {
  default: 'bg-white/60',
  success: 'bg-green-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-blue-400',
  accent: 'bg-[#AA62F5]',
} as const;

// ── Size maps ────────────────────────────────────────────────────────────────

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
} as const;

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
} as const;

// ── Status presets ───────────────────────────────────────────────────────────

/**
 * Each status preset defines its own variant override, dot behaviour,
 * glow toggle, and optional text prefix.
 */
const statusPresets = {
  connected: {
    variant: 'success' as const,
    dot: true,
    glow: true,
    prefix: null,
  },
  disconnected: {
    variant: 'default' as const,
    dot: true,
    glow: false,
    prefix: null,
  },
  pending: {
    variant: 'warning' as const,
    dot: true,
    glow: false,
    pulse: true,
    prefix: null,
  },
  verified: {
    variant: 'success' as const,
    dot: false,
    glow: true,
    prefix: '✓',
  },
  error: {
    variant: 'error' as const,
    dot: false,
    glow: true,
    prefix: '⚠',
  },
} as const;

// ── Network presets ──────────────────────────────────────────────────────────

const networkPresets = {
  base: {
    classes: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.25)]',
    dot: 'bg-blue-500',
  },
  'base-sepolia': {
    classes: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
    glow: 'shadow-[0_0_12px_rgba(251,146,60,0.25)]',
    dot: 'bg-orange-400',
  },
  ethereum: {
    classes: 'bg-indigo-400/10 border-indigo-400/30 text-indigo-400',
    glow: 'shadow-[0_0_12px_rgba(129,140,248,0.25)]',
    dot: 'bg-indigo-400',
  },
} as const;

/**
 * Props for the {@link Badge} component.
 *
 * @example
 * ```tsx
 * <Badge variant="accent" glow>New</Badge>
 * <Badge status="connected">Mainnet</Badge>
 * <Badge network="base">Base</Badge>
 * ```
 */
export interface BadgeProps {
  /** The badge label text or content */
  children: React.ReactNode;
  /** Visual colour variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a small dot indicator before the text */
  dot?: boolean;
  /** Whether the badge has a coloured glow effect */
  glow?: boolean;
  /** Network preset — overrides variant styling with chain-specific colours */
  network?: 'base' | 'base-sepolia' | 'ethereum';
  /** Status preset — overrides variant styling with contextual colours */
  status?: 'connected' | 'disconnected' | 'pending' | 'verified' | 'error';
  /** Additional class names merged onto the root element */
  className?: string;
}

/**
 * A versatile, inline-flex pill badge for the VEYLIX design system.
 *
 * Supports six colour variants, five status presets (connected, disconnected,
 * pending, verified, error), three network presets (Base, Base Sepolia,
 * Ethereum), optional animated dot indicators, and glow effects.
 *
 * @remarks
 * - Status and network presets override variant styling when provided.
 * - The `glow` prop layers a variant-aware box-shadow for emphasis.
 * - Dot indicators pulse automatically for the `pending` status.
 *
 * @example
 * ```tsx
 * // Simple variant badge
 * <Badge variant="success" dot>Active</Badge>
 *
 * // Status preset
 * <Badge status="connected">Mainnet</Badge>
 *
 * // Network preset with glow
 * <Badge network="base" glow>Base</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      dot = false,
      glow = false,
      network,
      status,
      className,
    },
    ref,
  ) => {
    // ── Resolve effective styling ─────────────────────────────────────
    let effectiveVariant = variant;
    let showDot = dot;
    let showGlow = glow;
    let pulsingDot = false;
    let prefix: string | null = null;

    // Status preset takes priority over raw variant
    if (status) {
      const preset = statusPresets[status];
      effectiveVariant = preset.variant;
      showDot = preset.dot || dot;
      showGlow = preset.glow || glow;
      pulsingDot = 'pulse' in preset && !!preset.pulse;
      prefix = preset.prefix ?? null;
    }

    // ── Network preset overrides everything ───────────────────────────
    const isNetwork = !!network;
    const netPreset = network ? networkPresets[network] : null;

    // ── Compute classes ───────────────────────────────────────────────
    const colorClasses = isNetwork
      ? netPreset!.classes
      : variantStyles[effectiveVariant];

    const glowClass = showGlow
      ? isNetwork
        ? netPreset!.glow
        : variantGlow[effectiveVariant]
      : '';

    const dotColor = isNetwork
      ? netPreset!.dot
      : variantDot[effectiveVariant];

    return (
      <span
        ref={ref}
        className={cn(
          // Base
          'inline-flex items-center gap-1.5 rounded-full border font-tech transition-all duration-300',
          sizeClasses[size],
          colorClasses,
          glowClass,
          className,
        )}
        data-testid="badge"
      >
        {/* Dot indicator */}
        {showDot && (
          <span
            className={cn(
              'rounded-full shrink-0',
              dotSizeClasses[size],
              dotColor,
              pulsingDot && 'animate-pulse',
            )}
            data-testid="badge-dot"
            aria-hidden="true"
          />
        )}

        {/* Status prefix (✓ / ⚠) */}
        {prefix && (
          <span className="shrink-0" aria-hidden="true">
            {prefix}
          </span>
        )}

        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
