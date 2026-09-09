import React from 'react';
import { KeyRound, ShieldAlert, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 mb-3 border border-red-200">
            <span>COMMON FRUSTRATIONS</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase leading-tight">
            YOUR DOOR DESERVES <span className="headline-red-outline text-red-600 inline-block">MORE THAN A KEY.</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Traditional locks are outdated, easy to duplicate, and vulnerable to lockouts.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Lost keys</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              Misplaced or stolen keys put your security at risk and force you to re-key your entire door lock cylinder.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Carry everywhere</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              Bulky heavy keychains slow you down every day, scratch your phone screens, and get forgotten at the worst moments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Share access</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              Duplicating keys for family, domestic staff, or Airbnb guests is inconvenient, expensive, and unsafe.
            </p>
          </div>
        </div>

        {/* Powerful Punchline Banner */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gray-900 via-neutral-900 to-black text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-500/20 text-red-200 mb-2 border border-red-400/30">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>THE ALL-IN-ONE SOLUTION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight">
              ONE SMART LOCK.<br />
              <span className="headline-red-outline-light text-red-500 inline-block">MULTIPLE WAYS TO ACCESS YOUR SPACE.</span>
            </h3>
          </div>
          <a
            href="#smart-access"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-extrabold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 shadow-sm"
          >
            Explore Access Modes
          </a>
        </div>
      </div>
    </section>
  );
};
