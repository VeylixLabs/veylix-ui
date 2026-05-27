import React from 'react';
import { cn } from '../lib/utils';

export interface NFTCardProps {
  id: string;
  name: string;
  price: string;
  creator: string;
  image?: string;
  verified?: boolean;
  className?: string;
  onBuy?: () => void;
  selected?: boolean;
  status?: 'completed' | 'processing' | 'failed';
}

export const NFTCard: React.FC<NFTCardProps> = ({
  id,
  name,
  price,
  creator,
  image,
  verified = false,
  className,
  onBuy,
  selected = false,
  status = 'completed',
}) => {
  return (
    <div
      className={cn(
        'card-veylix group flex w-full max-w-sm flex-col overflow-hidden text-left',
        'transition-all duration-300 hover:-translate-y-1',
        selected && 'border-[var(--border-active)] shadow-[0_0_24px_rgba(170,98,245,0.18)]',
        className,
      )}
      data-testid="nft-card"
      data-asset-id={id}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#07030c]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_50%,rgba(170,98,245,0.08),transparent_70%)]"
            data-testid="nft-empty-preview"
          >
            <svg
              className="h-10 w-10 text-[var(--accent-light)] opacity-35"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="font-tech text-[10px] text-white/45">NO PREVIEW</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-tech text-[10px] text-white shadow-[0_0_20px_rgba(170,98,245,0.5)]">
            VIEW
          </span>
        </div>

        <div className="vey-chip absolute right-2 top-2 px-2 py-1 backdrop-blur-md">
          3D
        </div>

        {verified && (
          <div className="absolute left-2 top-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 font-tech text-[9px] text-emerald-200 backdrop-blur-md">
            VERIFIED
          </div>
        )}

        {status !== 'completed' && (
          <div
            className={cn(
              'absolute bottom-2 left-2 rounded-full border px-2 py-1 font-tech text-[9px] uppercase backdrop-blur-md',
              status === 'processing' && 'border-amber-300/30 bg-amber-300/10 text-amber-200',
              status === 'failed' && 'border-red-300/30 bg-red-300/10 text-red-200',
            )}
          >
            {status}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate font-tech text-[12px] text-white">{name}</h3>
            <p className="mt-1 truncate text-xs text-white/45">by {creator}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-tech text-[9px] text-[var(--text-muted)]">PRICE</p>
            <p className="mt-1 font-tech text-[11px] font-bold text-[var(--accent-light)]">
              {price} ETH
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBuy}
          className={cn(
            'flex min-h-10 w-full items-center justify-center rounded-full',
            'border border-[var(--border-accent)] bg-[var(--accent)]/10',
            'font-tech text-[10px] text-white transition-all duration-300',
            'hover:-translate-y-px hover:bg-[var(--accent)] hover:shadow-[0_0_22px_rgba(170,98,245,0.28)]',
          )}
        >
          Acquire Asset
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};
