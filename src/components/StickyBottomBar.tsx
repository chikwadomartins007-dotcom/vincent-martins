import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { formatNaira } from '../utils/format';

interface StickyBottomBarProps {
  totalPrice: number;
  quantity: number;
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  totalPrice,
  quantity,
  onOrderClick,
  onWhatsAppClick,
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

          <div className="flex items-center gap-2">
            <button
              onClick={onOrderClick}
              className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm"
            >
              <span>ORDER NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onWhatsAppClick}
              className="inline-flex items-center justify-center h-11 w-11 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 active:scale-95 transition-all"
              aria-label="Order on WhatsApp"
              title="Order on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
