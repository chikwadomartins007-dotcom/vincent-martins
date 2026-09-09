import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>AUTHENTIC BUYER EXPERIENCES</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">VERIFIED CUSTOMER TESTIMONIALS</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            See what homeowners, property developers, and Airbnb hosts across Nigeria say about the A-01 Smart Door Lock.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-gray-50/80 border border-gray-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Top Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                <Quote className="w-7 h-7 text-blue-300 mb-2 opacity-60" />

                <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{t.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-blue-600 block">
                    {t.lockInstalledOn}
                  </span>
                  <span className="text-[10px] text-gray-400">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
