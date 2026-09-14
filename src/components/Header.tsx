import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOrderClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/95 transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm font-black text-lg tracking-tighter">
            M
          </div>
          <div>
            <a href="#" className="font-black text-gray-900 tracking-tight text-lg sm:text-xl hover:text-red-600 transition-colors">
              MAX LUXURY HOME TECH
            </a>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:block">
              Premium Smart Security & Architectural Hardware
            </p>
          </div>
        </div>

        {/* Badges & Actions */}
        <div className="flex items-center flex-wrap justify-center gap-2.5 sm:gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200/80 shadow-xs">
            <Truck className="w-3.5 h-3.5 text-red-600" />
            <span>Payment on Delivery</span>
            <span className="w-1 h-1 rounded-full bg-red-400"></span>
            <span>Nationwide</span>
          </div>

          <a
            href="#order"
            onClick={onOrderClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black bg-red-600 hover:bg-red-700 text-white transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>ORDER NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
