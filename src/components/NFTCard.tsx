import React from 'react';

export interface NFTCardProps {
  name: string;
  imageUrl: string;
  price?: string;
  onClick?: () => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({ name, imageUrl, price, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        {price && <p className="text-gray-400 mt-2">{price} VEYL</p>}
      </div>
    </div>
  );
};
