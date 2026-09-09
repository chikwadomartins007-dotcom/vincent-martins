import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
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
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/10 select-none"
          referrerPolicy="no-referrer"
        />
        <div className="mt-4 text-center">
          <p className="text-white font-bold text-base tracking-wide">
            {currentImage.label}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Image {currentIndex + 1} of {images.length} • Click anywhere outside to close
          </p>
        </div>
      </div>
    </div>
  );
};
