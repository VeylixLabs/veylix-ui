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
}

export const NFTCard: React.FC<NFTCardProps> = ({
  id,
  name,
  price,
  creator,
  image,
  verified = false,
  className,
  onBuy
}) => {
  return (
    <div className={cn(
      "flex flex-col w-full max-w-sm rounded-xl overflow-hidden transition-all duration-300",
      "bg-glassBg border border-glassBorder backdrop-blur-xs",
      "hover:shadow-glow-purple hover:-translate-y-1 hover:border-primaryColorLight/50",
      className
    )}>
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-backgroundColor/50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full transition-transform duration-700 hover:scale-110" />
        ) : (
          <div className="text-primaryColorDark font-tech uppercase text-xs tracking-widest animate-pulse">
            No Preview Available
          </div>
        )}
        
        {/* Verification Badge */}
        {verified && (
          <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/50 text-green-400 text-xs px-2 py-1 rounded font-mono backdrop-blur-md">
            ✓ VERIFIED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-white font-display text-lg tracking-wide">{name}</h3>
            <span className="text-accentBlue text-sm font-sans">by {creator}</span>
          </div>
          <div className="text-right flex flex-col">
            <span className="text-primaryColorDark text-xs font-mono">PRICE</span>
            <span className="text-primaryColorLight font-tech font-bold">{price} ETH</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onBuy}
          className={cn(
            "mt-2 w-full py-2.5 rounded font-tech text-sm tracking-widest uppercase transition-all duration-300",
            "bg-primaryColor/10 border border-primaryColor/30 text-white",
            "hover:bg-primaryColor hover:shadow-glow-purple"
          )}
        >
          Acquire Asset
        </button>
      </div>
    </div>
  );
};
