import React from 'react';
import { ShieldCheck, Sparkles, Zap, Building2, Home, Hotel, Briefcase, Key } from 'lucide-react';

export const WhyUpgradeAndSteps: React.FC = () => {
  const useCases = [
    { title: 'HOMEOWNERS', icon: <Home className="w-4 h-4" /> },
    { title: 'LANDLORDS', icon: <Building2 className="w-4 h-4" /> },
    { title: 'OFFICES', icon: <Briefcase className="w-4 h-4" /> },
    { title: 'SHORT-LET / AIRBNB', icon: <Key className="w-4 h-4" /> },
    { title: 'HOTELS', icon: <Hotel className="w-4 h-4" /> },
    { title: 'SERVICED APARTMENTS', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* WHY YOU NEED IT */}
      <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>THE SMART ADVANTAGE</span>
            </div>
            <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
              WHY UPGRADE TO <span className="headline-red-outline text-red-600 inline-block">SMART ACCESS?</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
              Transform your daily routine and upgrade the security quotient of your entrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                SMART CONVENIENCE
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Multiple ways to access your space without hunting through bags or pockets. Walk up, glance or touch, and enter effortlessly.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                FLEXIBLE ACCESS
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Choose smartphone, fingerprint, face, password, OTP or key. Set rules, manage family members, and revoke access instantly.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                MODERN LIFESTYLE
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Upgrade your entrance with a sleek, smart-lock experience that elevates your property's value and visual prestige.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
              <span>SIMPLE 3-STEP FLOW</span>
            </div>
            <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
              EASY. SMART. <span className="headline-red-outline text-red-600 inline-block">CONVENIENT.</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
              Getting started with your A-01 Smart Door Lock is completely effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="text-4xl font-black text-red-600 mb-4 tracking-tighter">
                01
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                CHOOSE YOUR ACCESS METHOD
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Select face, fingerprint, phone, PIN, or more. Enroll users in seconds with intuitive audio and visual display prompts.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="text-4xl font-black text-red-600 mb-4 tracking-tighter">
                02
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                UNLOCK YOUR DOOR
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Enjoy fast, secure entry—no keys required. Dual semiconductor authentication ensures only authorized people enter.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="text-4xl font-black text-red-600 mb-4 tracking-tighter">
                03
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
                ENJOY SMARTER ACCESS
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Manage access, codes and alerts with ease right from your phone. Receive notifications whenever visitors arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES CHIPS */}
      <section className="py-14 sm:py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-black text-gray-900 tracking-tight text-2xl sm:text-3xl md:text-4xl uppercase">
              BUILT FOR MODERN SPACES.
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-gray-600">
              Trusted by premium residential homes, executive offices, and hospitality managers nationwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white border border-gray-200 text-center font-black text-xs sm:text-sm text-gray-800 shadow-2xs hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <span className="text-blue-600">{uc.icon}</span>
                <span>{uc.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
