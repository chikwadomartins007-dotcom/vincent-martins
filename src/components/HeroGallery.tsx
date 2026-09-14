import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { ProductImage } from '../types';

interface HeroGalleryProps {
  images: ProductImage[];
  onOpenLightbox: (index: number) => void;
  selectedIndex?: number;
  onSelectIndex?: (index: number) => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

const SLIDE_INTERVAL_MS = 4500;

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  images,
  onOpenLightbox,
  selectedIndex: controlledIndex,
  onSelectIndex: controlledSelect,
  isPlaying: controlledIsPlaying,
  onTogglePlay,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalIsPlaying, setInternalIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex : internalIndex;
  const isPlaying = controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;

  const handleSelectIndex = useCallback(
    (index: number) => {
      if (controlledSelect) {
        controlledSelect(index);
      } else {
        setInternalIndex(index);
      }
    },
    [controlledSelect]
  );

  const togglePlay = () => {
    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setInternalIsPlaying((prev) => !prev);
    }
  };

  const nextSlide = useCallback(() => {
    handleSelectIndex((selectedIndex + 1) % images.length);
  }, [images.length, handleSelectIndex, selectedIndex]);

  const prevSlide = useCallback(() => {
    handleSelectIndex((selectedIndex - 1 + images.length) % images.length);
  }, [images.length, handleSelectIndex, selectedIndex]);

  // Slideshow auto-advance interval when not controlled by parent
  useEffect(() => {
    if (isControlled) return;
    if (!isPlaying || isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isControlled, isPlaying, isHovered, images.length, nextSlide, selectedIndex]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-3.5 select-none">
      {/* Main Showcase Slideshow Stage */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        <div
          onClick={() => onOpenLightbox(selectedIndex)}
          className="relative aspect-[4/3] sm:aspect-[16/13] w-full rounded-xl overflow-hidden bg-gray-900 cursor-zoom-in flex items-center justify-center"
        >
          {/* Slides with Cross-Fade */}
          {images.map((img, idx) => {
            const isDiagram =
              img.src.includes('Ha59') ||
              img.src.includes('H1f9') ||
              img.src.includes('H6d5') ||
              img.src.includes('Ha7c');
            return (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === selectedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full h-full ${
                    isDiagram
                      ? 'object-contain bg-white p-2'
                      : 'object-cover transition-transform duration-700 group-hover:scale-103'
                  }`}
                  referrerPolicy="no-referrer"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}

          {/* Radial soft ground shadow */}
          <div
            className="absolute inset-x-8 bottom-2 h-4 bg-radial from-black/30 to-transparent blur-md pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Badge */}
          {activeImage.badge && (
            <div className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full bg-red-600/95 text-white text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{activeImage.badge}</span>
            </div>
          )}

          {/* Slideshow Auto-Play indicator & Play/Pause Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="absolute top-3 right-3 z-30 px-2.5 py-1.5 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white text-[11px] font-bold backdrop-blur-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isPlaying && !isHovered ? (
              <>
                <Pause className="w-3 h-3 text-red-400" />
                <span className="hidden sm:inline">Slideshow Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span>{isHovered && isPlaying ? 'Paused (Hover)' : 'Play Slideshow'}</span>
              </>
            )}
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 active:scale-95 text-white backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md opacity-85 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 active:scale-95 text-white backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md opacity-85 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Click to Zoom Overlay pill */}
          <div className="absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-gray-900/85 hover:bg-gray-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 shadow-sm transition-opacity opacity-85 group-hover:opacity-100">
            <ZoomIn className="w-3.5 h-3.5 text-red-400" />
            <span>Tap to Zoom</span>
          </div>

          {/* Slide Dots Pagination */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xs">
            {images.map((_, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectIndex(idx);
                  }}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    isCurrent
                      ? 'w-6 h-2 bg-red-600'
                      : 'w-2 h-2 bg-white/60 hover:bg-white'
                  }`}
                />
              );
            })}
          </div>

          {/* Subtle Progress Bar */}
          {isPlaying && !isHovered && (
            <div
              key={`progress-${selectedIndex}`}
              className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 z-30"
              style={{
                animation: `expandProgress ${SLIDE_INTERVAL_MS}ms linear forwards`,
              }}
            />
          )}
        </div>

        {/* Gallery Caption & Slide Counter */}
        <div className="mt-2.5 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-800 tracking-tight">{activeImage.label}</span>
          <span className="text-[11px] font-semibold text-gray-400">
            Slide {selectedIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation Bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={img.id}
              onClick={() => handleSelectIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer bg-white ${
                isSelected
                  ? 'border-red-600 ring-2 ring-red-600/30 shadow-xs scale-102'
                  : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View slide ${idx + 1}: ${img.label}`}
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

      <div className="flex items-center justify-between text-xs font-medium text-gray-400 px-1">
        <span>Auto-sliding preview • Swipe or use arrows</span>
        <span>Click image for full HD zoom</span>
      </div>
    </div>
  );
};
