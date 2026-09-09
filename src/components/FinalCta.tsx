import React from 'react';
import { ArrowRight, MessageSquare, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { BASE_PRICE, ORIGINAL_PRICE, SAVINGS_PER_UNIT } from '../data/mockData';
import { formatNaira } from '../utils/format';

interface FinalCtaProps {
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOrderClick, onWhatsAppClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>LIMITED TIME PROMOTIONAL OFFER</span>
          </div>

          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.05]">
            <span className="headline-red-outline text-red-600 inline-block">UPGRADE YOUR DOOR.</span><br />
            <span className="headline-red-outline text-red-600 inline-block">UPGRADE YOUR SECURITY.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg font-medium text-gray-600 max-w-xl">
            Experience smarter access without depending on ordinary keys. Multiple ways to unlock, seamless companion app, and robust multi-point deadbolts.
          </p>

          {/* Pricing Highlight Pill */}
          <div className="mt-8 flex items-baseline gap-3 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              {formatNaira(BASE_PRICE)}
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-400 line-through">
              {formatNaira(ORIGINAL_PRICE)}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-md">
              SAVE {formatNaira(SAVINGS_PER_UNIT)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onOrderClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl font-black text-sm tracking-wide text-white bg-red-600 hover:bg-red-700 active:scale-98 transition-all shadow-md shadow-red-600/25 cursor-pointer"
            >
              <span>ORDER YOUR SMART LOCK NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWhatsAppClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl font-bold text-sm tracking-wide text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 active:scale-98 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>ORDER ON WHATSAPP</span>
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200">
            <Truck className="w-3.5 h-3.5 text-red-600" />
            <span>PAYMENT ON DELIVERY</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
            <span>NATIONWIDE DELIVERY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
