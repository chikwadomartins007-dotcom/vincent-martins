import React from 'react';
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
} from 'lucide-react';
import { HeroGallery } from './HeroGallery';
import { PRODUCT_IMAGES, BASE_PRICE, ORIGINAL_PRICE, SAVINGS_PER_UNIT } from '../data/mockData';
import { formatNaira } from '../utils/format';

interface HeroProps {
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
  onOpenLightbox: (index: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onWhatsAppClick,
  onOpenLightbox,
}) => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Prop, Pricing, CTAs, Trust Row */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>A-01 FLAGSHIP SERIES</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-black text-gray-900 tracking-tight leading-[1.04] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] uppercase">
              <span className="headline-red-outline text-red-600 inline-block">STOP USING ORDINARY KEYS.</span><br />
              <span className="headline-red-outline text-red-600 inline-block">UPGRADE TO SMART ACCESS.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-3.5 text-base sm:text-lg font-semibold text-gray-600 uppercase tracking-wide">
              SECURE YOUR HOME WITH MULTIPLE WAYS TO UNLOCK.
            </p>

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

          {/* Right Column: Interactive Gallery */}
          <div className="lg:col-span-6">
            <HeroGallery images={PRODUCT_IMAGES} onOpenLightbox={onOpenLightbox} />
          </div>
        </div>
      </div>
    </section>
  );
};
