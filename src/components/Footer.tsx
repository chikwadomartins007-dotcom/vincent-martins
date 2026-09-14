import React from 'react';
import { ShieldCheck, Truck, Headphones, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOrderClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrderClick }) => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-12 pb-16 border-t border-gray-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                MAX LUXURY HOME TECH
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Nigeria's trusted distributor of high-security smart door locks, architectural security fittings, and luxury home technology solutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Service Guarantees
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-400 shrink-0" />
                <span>Nationwide delivery to all 36 Nigerian states</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                <span>Payment on Delivery in select locations</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-red-400 shrink-0" />
                <span>Installation consultation & technician guides</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Order Dispatch Desk
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Ready to secure your home? Fill out the order form to secure promotional pricing. Our dispatch team verifies your door dimensions and schedules delivery before courier dispatch.
            </p>
            <a
              href="#order"
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-xs"
            >
              <span>GO TO ORDER FORM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MAX LUXURY HOME TECH. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>A-01 Flagship Smart Door Lock</span>
            <span>•</span>
            <span>Made for Nigerian Homes & Offices</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
