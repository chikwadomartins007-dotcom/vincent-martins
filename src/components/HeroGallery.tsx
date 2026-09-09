import React, { useState } from 'react';
import { ZoomIn, Eye, Sparkles } from 'lucide-react';
import { ProductImage } from '../types';

interface HeroGalleryProps {
  images: ProductImage[];
  onOpenLightbox: (index: number) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ images, onOpenLightbox }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* Main Showcase Stage */}
      <div
        onClick={() => onOpenLightbox(selectedIndex)}
        className="group relative bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all cursor-zoom-in overflow-hidden"
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/13] w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Radial soft ground shadow */}
          <div
            className="absolute inset-x-8 bottom-2 h-4 bg-radial from-black/20 to-transparent blur-md pointer-events-none"
            aria-hidden="true"
          />

          {/* Badge */}
          {activeImage.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600/95 text-white text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{activeImage.badge}</span>
            </div>
          )}

          {/* Click to Zoom Overlay pill */}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 shadow-sm transition-opacity opacity-80 group-hover:opacity-100">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Tap to Zoom</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-800">{activeImage.label}</span>
          <span className="text-[11px] font-medium text-gray-400">
            {selectedIndex + 1} of {images.length} views
          </span>
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer bg-white ${
                isSelected
                  ? 'border-red-600 ring-2 ring-red-600/20 shadow-xs scale-102'
                  : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}: ${img.label}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 border-2 border-red-600 rounded-lg pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs font-medium text-gray-400 text-center sm:text-left">
        Tap main image to inspect in full HD zoom • Click thumbnails to inspect details
      </p>
    </div>
  );
};
