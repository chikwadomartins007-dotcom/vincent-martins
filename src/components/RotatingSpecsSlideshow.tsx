import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { FACTORY_SLIDES } from '../data/mockData';

interface RotatingSpecsSlideshowProps {
  onOrderClick: () => void;
  onOpenLightbox?: (index: number) => void;
}

const ROTATION_INTERVAL_MS = 4000;

export const RotatingSpecsSlideshow: React.FC<RotatingSpecsSlideshowProps> = ({
  onOrderClick,
  onOpenLightbox,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FACTORY_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FACTORY_SLIDES.length) % FACTORY_SLIDES.length);
  }, []);

  // Automatic live rotation timer
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, ROTATION_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, nextSlide, currentIndex]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    const minSwipeDistance = 40;

    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const currentSlide = FACTORY_SLIDES[currentIndex];

  return (
    <section id="specifications" className="py-14 sm:py-20 bg-white border-b border-gray-200 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3 tracking-wide">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>AUTHENTIC FACTORY SPECIFICATIONS</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">LIVE PRODUCT SLIDESHOW</span>
          </h2>
          <p className="mt-2.5 text-base sm:text-lg font-medium text-gray-600">
            Rotating high-resolution technical diagrams, exact dimensions, included accessories, and safety certifications.
          </p>
        </div>

        {/* Master Rotating Showcase Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Main Slideshow Stage Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-[460px] aspect-square rounded-2xl sm:rounded-3xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden group flex items-center justify-center p-2 sm:p-4 transition-all"
            >
              {/* Rotating Image Viewport */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {FACTORY_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto z-10'
                          : idx < currentIndex
                          ? 'opacity-0 scale-95 -translate-x-full pointer-events-none z-0'
                          : 'opacity-0 scale-95 translate-x-full pointer-events-none z-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain select-none cursor-pointer"
                        onClick={() => onOpenLightbox && onOpenLightbox(idx + 1)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Top Badge Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-white/20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {currentSlide.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-gray-200 text-[11px] font-bold border border-white/20 shadow-xs">
                  Slide {currentIndex + 1} of {FACTORY_SLIDES.length}
                </span>
              </div>

              {/* Left/Right Live Carousel Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center shadow-lg transition-all opacity-85 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center shadow-lg transition-all opacity-85 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Quick Action: Zoom In */}
              {onOpenLightbox && (
                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentIndex + 1)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all z-20 cursor-pointer hover:scale-105 shadow-sm flex items-center gap-1 text-[11px] font-bold"
                  title="Enlarge Fullscreen"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tap to Zoom</span>
                </button>
              )}

              {/* Bottom Live Timer Progress Bar */}
              {isPlaying && !isHovered && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 z-20 overflow-hidden">
                  <div
                    key={currentIndex}
                    className="h-full bg-red-600 transition-all duration-100 ease-linear"
                    style={{
                      animation: `specsProgress ${ROTATION_INTERVAL_MS}ms linear forwards`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Slideshow Live Controls Bar */}
            <div className="mt-3.5 flex items-center justify-between w-full max-w-[460px] px-1">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer shadow-2xs"
              >
                {isPlaying && !isHovered ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[11px]">Auto-Rotating Live</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span className="text-[11px]">{isHovered && isPlaying ? 'Paused on Hover' : 'Resume Rotation'}</span>
                  </>
                )}
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {FACTORY_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? 'w-7 h-2 bg-red-600'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 4 Interactive Thumbnail Previews */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-[460px] mt-3.5">
              {FACTORY_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 aspect-square p-1 bg-white transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-600 ring-2 ring-red-500/20 shadow-md scale-102'
                        : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                    <span
                      className={`absolute bottom-1 inset-x-1 text-[9px] font-black uppercase text-center truncate py-0.5 rounded-sm ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-gray-900/75 text-gray-200'
                      }`}
                    >
                      {idx === 0 ? 'Modes' : idx === 1 ? 'Size' : idx === 2 ? 'In Box' : 'Certs'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slide Description & Breakdown Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.category}</span>
            </div>
            <h3 className="font-black text-gray-900 tracking-tight text-2xl sm:text-3xl leading-snug">
              {currentSlide.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {currentSlide.caption}
            </p>

            {/* Quick Context Breakdown based on active slide */}
            <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
              {currentIndex === 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>8 Unlocking Modes: App, Fingerprint, PIN, NFC Card, Face, Palm, Key & Waterproofing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Standard 6068 Multi-Point Heavy Mortise Lock Body</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Powered by Tuya Smart Life IoT Ecosystem</span>
                  </div>
                </div>
              )}

              {currentIndex === 1 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Architectural Height: 420 mm • Handle Width: 70 mm</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Indoor 4.0" Color HD Display with One-Touch Door Unlock/Lock Buttons</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Concealed Type-C Emergency Power Port & Bottom Keyhole</span>
                  </div>
                </div>
              )}

              {currentIndex === 2 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2 × Encrypted RFID Smart Cards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>304 Stainless Steel Mortise + High-Security Cylinder & 2 Master Keys</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Rechargeable Power Pack, USB-C Cable, Hardware Screws & Package Box</span>
                  </div>
                </div>
              )}

              {currentIndex === 3 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>10,000± Hours Battery Standby Life</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>250,000 Cycle Testing Durability (Over 10 Years Daily Use)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certified by CE, FC, EMC, RoHS, and ISO International Standards</span>
                  </div>
                </div>
              )}
            </div>

            {/* Nationwide Trust Notice */}
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                <strong className="font-bold">Official MAX LUXURY HOME TECH Guarantee:</strong> Every unit is factory calibrated, tested, and dispatched in genuine retail packaging. Pay cash or transfer on delivery anywhere in Nigeria.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOrderClick}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-black text-sm tracking-wide text-white bg-red-600 hover:bg-red-700 active:scale-98 transition-all shadow-md shadow-red-600/20 cursor-pointer text-center"
              >
                <span>ORDER THIS SMART LOCK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center h-12 px-5 rounded-xl font-bold text-xs tracking-wide text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
              >
                VIEW DISCOUNTS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
