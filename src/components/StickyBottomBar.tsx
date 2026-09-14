import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatNaira } from '../utils/format';

interface StickyBottomBarProps {
  totalPrice: number;
  quantity: number;
  onOrderClick: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  totalPrice,
  quantity,
  onOrderClick,
}) => {
  return (
    <>
      {/* Spacer so the sticky bar doesn't obstruct footer content on mobile */}
      <div className="h-20 lg:hidden" aria-hidden="true" />

      {/* Sticky Bar for mobile & tablet */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2.5 px-4 lg:hidden shadow-lg transition-transform">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {quantity} {quantity === 1 ? 'Unit' : 'Units'} Total
            </div>
            <div className="text-lg font-black text-gray-900 tracking-tight leading-none">
              {formatNaira(totalPrice)}
            </div>
          </div>

          <button
            onClick={onOrderClick}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>ORDER NOW • PAY ON DELIVERY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
