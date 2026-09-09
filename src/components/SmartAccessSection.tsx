import React, { useState } from 'react';
import {
  ScanFace,
  Fingerprint,
  Smartphone,
  KeyRound,
  ShieldCheck,
  Key,
  BatteryCharging,
  Bell,
  ArrowRight,
  Wifi,
  Sparkles,
} from 'lucide-react';
import { UNLOCK_METHODS } from '../data/mockData';

interface SmartAccessProps {
  onOrderClick: () => void;
}

export const SmartAccessSection: React.FC<SmartAccessProps> = ({ onOrderClick }) => {
  const [activeSimulation, setActiveSimulation] = useState<'locked' | 'unlocked'>('locked');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ScanFace':
        return <ScanFace className="w-6 h-6" />;
      case 'Fingerprint':
        return <Fingerprint className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'KeyRound':
        return <KeyRound className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Key':
        return <Key className="w-6 h-6" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6" />;
      case 'Bell':
        return <Bell className="w-6 h-6" />;
      default:
        return <KeyRound className="w-6 h-6" />;
    }
  };

  return (
    <section id="smart-access" className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>8 VERSATILE UNLOCK MODES</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            UNLOCK YOUR DOOR <span className="headline-red-outline text-red-600 inline-block">YOUR WAY.</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Never get stranded outside again. Every member of your family can use their preferred entry method.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {UNLOCK_METHODS.map((method) => (
            <div
              key={method.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center">
                    {getIcon(method.iconName)}
                  </div>
                  {method.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                      {method.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-red-600 transition-colors">
                  {method.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Smartphone Remote Unlock Spotlight Card */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-3">
                <Wifi className="w-3.5 h-3.5 text-red-600" />
                <span>TUYA / SMART LIFE ECOSYSTEM</span>
              </div>
              <h3 className="font-black text-gray-900 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">
                <span className="headline-red-outline text-red-600 inline-block">UNLOCK WITH YOUR PHONE</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-xl">
                Use your smartphone to unlock the smart door lock and enjoy convenient keyless access from the couch or while on the road. View real-time visitor ring alerts and battery telemetry.
              </p>

              {/* Interactive Unlock Simulation */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full animate-pulse ${
                        activeSimulation === 'unlocked' ? 'bg-emerald-500' : 'bg-red-600'
                      }`}
                    />
                    <span className="text-xs font-bold text-gray-700">
                      Door Status: {activeSimulation === 'unlocked' ? 'OPEN / UNLOCKED' : 'SECURELY LOCKED'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSimulation((prev) => (prev === 'locked' ? 'unlocked' : 'locked'));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSimulation === 'locked'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {activeSimulation === 'locked' ? 'Simulate Tap to Unlock' : 'Tap to Lock Back'}
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={onOrderClick}
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-200">
                <img
                  src="/assets/img/smart-lock-app-unlock.png"
                  alt="Remote unlock with companion smartphone app and real-time talk"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
