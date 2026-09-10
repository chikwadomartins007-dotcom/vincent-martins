import React, { useState, useEffect, useCallback } from 'react';
import {
  ScanFace,
  Fingerprint,
  Smartphone,
  KeyRound,
  ShieldCheck,
  Key,
  BatteryCharging,
  Bell,
  ArrowRight,
  Wifi,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { UNLOCK_METHODS, APP_INTERFACE_SLIDES } from '../data/mockData';

interface SmartAccessProps {
  onOrderClick: () => void;
}

const APP_SLIDE_INTERVAL_MS = 4200;

export const SmartAccessSection: React.FC<SmartAccessProps> = ({ onOrderClick }) => {
  const [activeSimulation, setActiveSimulation] = useState<'locked' | 'unlocked'>('locked');
  const [activeAppSlide, setActiveAppSlide] = useState(0);
  const [isAppPlaying, setIsAppPlaying] = useState(true);
  const [isAppHovered, setIsAppHovered] = useState(false);

  const nextAppSlide = useCallback(() => {
    setActiveAppSlide((prev) => (prev + 1) % APP_INTERFACE_SLIDES.length);
  }, []);

  const prevAppSlide = useCallback(() => {
    setActiveAppSlide((prev) => (prev - 1 + APP_INTERFACE_SLIDES.length) % APP_INTERFACE_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isAppPlaying || isAppHovered) return;

    const timer = setInterval(() => {
      nextAppSlide();
    }, APP_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAppPlaying, isAppHovered, nextAppSlide, activeAppSlide]);

  const currentAppSlide = APP_INTERFACE_SLIDES[activeAppSlide] || APP_INTERFACE_SLIDES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ScanFace':
        return <ScanFace className="w-6 h-6" />;
      case 'Fingerprint':
        return <Fingerprint className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'KeyRound':
        return <KeyRound className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Key':
        return <Key className="w-6 h-6" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6" />;
      case 'Bell':
        return <Bell className="w-6 h-6" />;
      default:
        return <KeyRound className="w-6 h-6" />;
    }
  };

  return (
    <section id="smart-access" className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>8 VERSATILE UNLOCK MODES</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            UNLOCK YOUR DOOR <span className="headline-red-outline text-red-600 inline-block">YOUR WAY.</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Never get stranded outside again. Every member of your family can use their preferred entry method.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {UNLOCK_METHODS.map((method) => (
            <div
              key={method.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center">
                    {getIcon(method.iconName)}
                  </div>
                  {method.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                      {method.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-red-600 transition-colors">
                  {method.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Smartphone & Smart Lock Interface Slideshow Card */}
        <div
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          className="mt-8 sm:mt-12 rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-8 lg:p-10 select-none overflow-hidden"
        >
          {/* Card Header & Slideshow Navigation Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-2">
                <Wifi className="w-3.5 h-3.5 text-red-600" />
                <span>TUYA / SMART LIFE ECOSYSTEM</span>
              </div>
              <h3 className="font-black text-gray-900 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">
                <span className="headline-red-outline text-red-600 inline-block">SMARTPHONE & LOCK INTERFACE</span>
              </h3>
            </div>

            {/* Slideshow Progress Bar & Controls */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
              <button
                onClick={() => setIsAppPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
                aria-label={isAppPlaying ? 'Pause interface slideshow' : 'Resume interface slideshow'}
              >
                {isAppPlaying && !isAppHovered ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-red-600" />
                    <span>Auto-Playing (4.2s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>{isAppHovered && isAppPlaying ? 'Paused (Hover)' : 'Play Interface'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={prevAppSlide}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous interface screen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextAppSlide}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next interface screen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Interface Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 pb-6">
            {APP_INTERFACE_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeAppSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveAppSlide(idx)}
                  className={`relative p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer overflow-hidden border ${
                    isCurrent
                      ? 'bg-red-50/70 border-red-300 shadow-xs'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isCurrent ? 'text-red-700' : 'text-gray-500'
                      }`}
                    >
                      {slide.tag}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCurrent ? 'bg-red-600 animate-pulse' : 'bg-gray-300'
                      }`}
                    />
                  </div>
                  <div className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1">
                    {slide.title}
                  </div>

                  {/* Animated tab progress bar */}
                  {isCurrent && isAppPlaying && !isAppHovered && (
                    <span
                      key={`app-tab-${activeAppSlide}`}
                      className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-full"
                      style={{
                        animation: `expandProgress ${APP_SLIDE_INTERVAL_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Slide Content & Interactive Phone Display Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Left Content for Active Slide */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div key={currentAppSlide.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gray-900 text-white mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentAppSlide.statusBadge}</span>
                </div>

                <h4 className="font-black text-gray-900 text-2xl sm:text-3xl uppercase tracking-tight">
                  {currentAppSlide.title}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-red-600 mt-1 uppercase tracking-wider">
                  {currentAppSlide.subtitle}
                </p>
                <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                  {currentAppSlide.description}
                </p>
              </div>

              {/* Interactive Unlock Simulation Console */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${
                        activeSimulation === 'unlocked'
                          ? 'bg-emerald-500 shadow-sm shadow-emerald-400 animate-pulse'
                          : 'bg-red-600'
                      }`}
                    />
                    <div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase">Live Demo Simulation</div>
                      <div className="text-xs font-black text-gray-900">
                        Lock State: {activeSimulation === 'unlocked' ? 'UNLOCKED (OPEN)' : 'LOCKED (ARMED)'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSimulation((prev) => (prev === 'locked' ? 'unlocked' : 'locked'));
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                      activeSimulation === 'locked'
                        ? 'bg-red-600 text-white hover:bg-red-700 active:scale-98'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98'
                    }`}
                  >
                    {activeSimulation === 'locked' ? 'Tap To Unlock Lock' : 'Tap To Arm / Lock'}
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={onOrderClick}
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>ORDER WITH THIS INTERFACE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Screen: Styled Phone Display Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl p-2.5 bg-gray-900 shadow-xl border-4 border-gray-800">
                {/* Smartphone Speaker / Notch Bar */}
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-3 bg-gray-800 rounded-full flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                    <span className="w-6 h-1 bg-gray-700 rounded-full" />
                  </div>
                </div>

                {/* Main Screen Frame */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    key={currentAppSlide.id}
                    src={currentAppSlide.imageSrc}
                    alt={currentAppSlide.title}
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Overlay Status Pill on Screen */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{currentAppSlide.tag}</span>
                  </div>

                  {/* Quick Bottom Control on Screen */}
                  <div className="absolute bottom-2 inset-x-2 p-2 rounded-lg bg-black/75 backdrop-blur-xs text-white flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-gray-300 truncate max-w-[180px]">
                      {currentAppSlide.subtitle}
                    </span>
                    <span className="font-extrabold text-red-400 shrink-0">
                      {activeAppSlide + 1} / {APP_INTERFACE_SLIDES.length}
                    </span>
                  </div>
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="flex justify-center mt-2">
                  <div className="w-24 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

