import React from 'react';
import { Play, Sparkles, Shield, Smartphone } from 'lucide-react';

export const VideoSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Play className="w-3 h-3 fill-current text-red-600" />
            <span>LIVE DEMONSTRATION</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">SEE IT IN ACTION</span>
          </h2>
          <p className="mt-2.5 text-base sm:text-lg font-medium text-gray-600">
            Short hands-on demo of the A-01 Smart Door Lock in real-time operation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 max-w-4xl mx-auto">
          {/* 9:16 Aspect Ratio Frame */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] shrink-0">
            <div className="relative w-full pt-[177.78%] rounded-2xl overflow-hidden shadow-xl border-4 border-gray-900 bg-black">
              <iframe
                title="A-01 Smart Door Lock video demo"
                src="https://www.youtube.com/embed/2djUOJ_PIWY?autoplay=1&mute=1&playsinline=1&loop=1&playlist=2djUOJ_PIWY&controls=1&rel=0&modestbranding=1&enablejsapi=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xs font-semibold text-gray-500 mt-3 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Autoplaying Live Demo • Tap video to unmute sound</span>
            </p>
          </div>

          {/* Highlights alongside video */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Instant Face Recognition</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Watch the infrared sensor wake up and unlock automatically as you step near the door.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">One-Touch Fingerprint Grip</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Natural thumb placement verifies your identity and disengages the deadbolts in one single motion.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Two-Way Video Doorbell</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Check who rings from anywhere via the smartphone companion app and grant one-tap guest entry.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#order"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm text-center mt-2"
            >
              Order Your Smart Lock Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
