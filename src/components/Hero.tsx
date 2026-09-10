import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Truck,
  Award,
  Wrench,
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { HeroGallery } from './HeroGallery';
import {
  PRODUCT_IMAGES,
  HERO_SLIDES,
  BASE_PRICE,
  ORIGINAL_PRICE,
  SAVINGS_PER_UNIT,
} from '../data/mockData';
import { formatNaira } from '../utils/format';

interface HeroProps {
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
  onOpenLightbox: (index: number) => void;
}

const HERO_SLIDE_INTERVAL_MS = 4800;

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onWhatsAppClick,
  onOpenLightbox,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Synchronized Hero Slideshow Timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, HERO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide, activeSlideIndex]);

  const currentSlide = HERO_SLIDES[activeSlideIndex] || HERO_SLIDES[0];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 bg-white overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slideshow Interface Control Bar & Slide Tabs */}
        <div className="mb-6 pb-4 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 select-none">
          {/* Slide Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap overflow-hidden flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-red-50 text-red-700 border border-red-200 shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/60'
                  }`}
                  aria-label={`Switch to slide ${idx + 1}: ${slide.tabTitle}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? 'bg-red-600 animate-pulse' : 'bg-gray-300'
                    }`}
                  />
                  <span>{slide.tabTitle}</span>

                  {/* Active Slide Countdown Progress Bar */}
                  {isCurrent && isPlaying && !isHovered && (
                    <span
                      key={`hero-tab-${activeSlideIndex}`}
                      className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-full"
                      style={{
                        animation: `expandProgress ${HERO_SLIDE_INTERVAL_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Slideshow Master Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
              aria-label={isPlaying ? 'Pause interface slideshow' : 'Play interface slideshow'}
            >
              {isPlaying && !isHovered ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[11px]">Slideshow Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span className="text-[11px]">{isHovered && isPlaying ? 'Paused on Hover' : 'Resume Slideshow'}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Slideshow Dynamic Headline, Highlights, Pricing, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Animated Slide Content Box */}
            <div key={currentSlide.id} className="animate-in fade-in slide-in-from-left-4 duration-300">
              {/* Micro-badge */}
              <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-3.5">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-black text-gray-900 tracking-tight leading-[1.04] text-3xl sm:text-4xl md:text-5xl lg:text-[50px] uppercase">
                <span className="headline-red-outline text-red-600 inline-block">
                  {currentSlide.headlinePrefix}
                </span>
                <br />
                <span className="headline-red-outline text-red-600 inline-block">
                  {currentSlide.headlineHighlight}
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-3.5 text-base sm:text-lg font-semibold text-gray-600 uppercase tracking-wide">
                {currentSlide.subheadline}
              </p>

              {/* Feature Tags Row */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {currentSlide.bullets.map((bullet, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100/90 text-gray-800 text-xs font-bold border border-gray-200/80"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{bullet}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-6 flex items-baseline flex-wrap gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                {formatNaira(BASE_PRICE)}
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-400 line-through">
                {formatNaira(ORIGINAL_PRICE)}
              </div>
              <div className="px-2.5 py-1 rounded-md text-xs sm:text-sm font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 tracking-wide">
                SAVE {formatNaira(SAVINGS_PER_UNIT)}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl font-black text-sm tracking-wide text-white bg-red-600 hover:bg-red-700 active:scale-98 transition-all shadow-md shadow-red-600/25 cursor-pointer"
              >
                <span>ORDER MY SMART LOCK</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl font-bold text-sm tracking-wide text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 active:scale-98 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>ORDER ON WHATSAPP</span>
              </button>
            </div>

            {/* Trust Row (5 elements) */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                  <Truck className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    PAYMENT ON DELIVERY
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    NATIONWIDE DELIVERY
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                  <Award className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    PREMIUM QUALITY
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                  <Wrench className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    EASY INSTALLATION
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                  <HeadphonesIcon className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    CUSTOMER SUPPORT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Synchronized Interactive Gallery */}
          <div className="lg:col-span-6">
            <HeroGallery
              images={PRODUCT_IMAGES}
              onOpenLightbox={onOpenLightbox}
              selectedIndex={currentSlide.imageIndex}
              onSelectIndex={(index) => {
                // Find matching slide or default to index
                const matchedSlide = HERO_SLIDES.findIndex((s) => s.imageIndex === index);
                if (matchedSlide !== -1) {
                  setActiveSlideIndex(matchedSlide);
                } else {
                  setActiveSlideIndex(index % HERO_SLIDES.length);
                }
              }}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

