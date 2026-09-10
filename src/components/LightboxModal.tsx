import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { ProductImage } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  images: ProductImage[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const nextSlide = useCallback(() => {
    onSelectIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  const prevSlide = useCallback(() => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  // Slideshow auto-advance in lightbox
  useEffect(() => {
    if (!isOpen || !isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, isAutoPlaying, images.length, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsAutoPlaying(false);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, nextSlide, prevSlide, onClose]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview lightbox"
    >
      {/* Top action controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Start slideshow'}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-red-400" />
              <span>Pause Slideshow</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Play Slideshow</span>
            </>
          )}
        </button>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-red-600 text-white transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-red-600 text-white transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentImage.id}
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[72vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/10 select-none animate-in fade-in zoom-in-95 duration-200"
          referrerPolicy="no-referrer"
        />

        <div className="mt-3 text-center">
          <p className="text-white font-bold text-base sm:text-lg tracking-wide">
            {currentImage.label}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            Slide {currentIndex + 1} of {images.length} • Press Space to {isAutoPlaying ? 'pause' : 'play'} slideshow
          </p>

          {/* Mini thumbnails strip in lightbox */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => onSelectIndex(idx)}
                className={`w-12 h-9 rounded-md overflow-hidden border transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'border-red-500 ring-2 ring-red-500/40 scale-105'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

