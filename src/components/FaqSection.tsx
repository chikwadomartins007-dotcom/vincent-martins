import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-8']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">FREQUENTLY ASKED QUESTIONS</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Find answers to common questions about installation, battery life, phone unlocking, and delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
