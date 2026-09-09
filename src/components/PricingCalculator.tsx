import React from 'react';
import { Minus, Plus, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PRICING_TIERS, getTierForQty } from '../data/mockData';
import { formatNaira } from '../utils/format';

interface PricingCalculatorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onOrderNowClick: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  quantity,
  onQuantityChange,
  onOrderNowClick,
}) => {
  const currentTier = getTierForQty(quantity);

  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) onQuantityChange(quantity + 1);
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>VOLUME DISCOUNT</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            THE MORE YOU BUY, <span className="headline-red-outline text-red-600 inline-block">THE MORE YOU SAVE!</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Outfit your entire house, apartment units, or office building and unlock massive bulk savings.
          </p>
        </div>

        {/* Pricing Tiers Table */}
        <div className="grid grid-cols-1 gap-2.5 max-w-3xl">
          {PRICING_TIERS.map((tier) => {
            const isCurrent = quantity === tier.quantity;
            return (
              <div
                key={tier.quantity}
                onClick={() => onQuantityChange(tier.quantity)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-red-50/80 border-red-600 ring-2 ring-red-600/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-base sm:text-lg tracking-tight">
                      {tier.label} — {formatNaira(tier.unitPrice)} EACH
                    </div>
                    {tier.popular && (
                      <span className="inline-block mt-0.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                        Most Popular for Duplexes
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-semibold uppercase">Total</div>
                    <div className="text-base sm:text-lg font-black text-gray-900">
                      {formatNaira(tier.totalPrice)}
                    </div>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <div className="text-xs text-gray-500 font-semibold uppercase">Savings</div>
                    <div
                      className={`text-sm sm:text-base font-extrabold ${
                        tier.savings > 0 ? 'text-emerald-700' : 'text-gray-400'
                      }`}
                    >
                      {tier.savings > 0 ? `Save ${formatNaira(tier.savings)}` : 'Save ₦0'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Calculator Controls */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <span className="font-extrabold text-sm sm:text-base text-gray-900">Choose Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-11 h-11 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  onQuantityChange(Math.max(1, Math.min(10, val)));
                }}
                className="w-14 h-11 text-center font-black text-lg text-gray-900 border-x border-gray-200 focus:outline-none"
                aria-label="Quantity selector"
              />
              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= 10}
                className="w-11 h-11 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-600">
                {formatNaira(currentTier.unitPrice)} each
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xl font-black text-gray-900">
                Total {formatNaira(currentTier.totalPrice)}
              </span>
            </div>
            {currentTier.savings > 0 && (
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600 mt-0.5">
                🎉 You Save {formatNaira(currentTier.savings)} with this bulk tier!
              </span>
            )}
          </div>

          <button
            onClick={onOrderNowClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
          >
            <span>Proceed with {quantity}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
