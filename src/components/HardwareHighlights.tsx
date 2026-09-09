import React from 'react';
import {
  Camera,
  Tv,
  Touchpad,
  Lock,
  Maximize2,
  ShieldAlert,
  Monitor,
  Grid,
  Fingerprint,
  BellRing,
  Key,
  Zap,
  Wifi,
  Ruler,
  Check,
} from 'lucide-react';
import { HARDWARE_HIGHLIGHTS } from '../data/mockData';

export const HardwareHighlights: React.FC = () => {
  const getHardwareIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      case 'Tv':
        return <Tv className="w-5 h-5" />;
      case 'Touchpad':
        return <Touchpad className="w-5 h-5" />;
      case 'Lock':
        return <Lock className="w-5 h-5" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5" />;
      case 'Grid':
        return <Grid className="w-5 h-5" />;
      case 'Fingerprint':
        return <Fingerprint className="w-5 h-5" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5" />;
      case 'Key':
        return <Key className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5" />;
      default:
        return <Lock className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 mb-3 border border-red-200">
            <span>ENGINEERED EXCELLENCE</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">HARDWARE HIGHLIGHTS</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Crafted with high-strength zinc alloy and scratch-resistant tempered glass for long-lasting security.
          </p>
        </div>

        {/* Hardware Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {HARDWARE_HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    {getHardwareIcon(item.iconName)}
                  </div>
                  {item.spec && (
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {item.spec}
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-gray-900 text-base leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs text-gray-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mortise Engineering Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 mb-3 border border-red-200">
                <Ruler className="w-3.5 h-3.5 text-red-600" />
                <span>HEAVY DUTY STANDARD</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
                <span className="headline-red-outline text-red-600 inline-block">24×240MM</span> MULTI-POINT MORTISE CORE
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                Standard Nigerian architectural security door compatible size. Engineered from 304 solid stainless steel with multi-point anti-saw, anti-pry deadbolts.
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Faceplate dimensions: 24mm width × 240mm length</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Backset standard: 60mm / 68mm compatible</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Door thickness compatibility: 38mm to 100mm wooden or metal doors</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reversible handle: Fits both left-opening and right-opening doors</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white p-2">
                <img
                  src="/assets/img/smart-lock-mortise.png"
                  alt="Mortise dimensions for A-01 Smart Door Lock, 24×240, 60/68 backset"
                  className="w-full max-h-[380px] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
