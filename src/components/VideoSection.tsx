import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Eye,
  Monitor,
  CheckCircle2,
  Smartphone,
  Maximize2,
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.log('Video play interrupted', e);
        });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const highlights = [
    {
      step: '01',
      title: "Visual Cat's Eye Electronic Doorbell",
      desc: 'Replaces old blurry glass peepholes with an integrated high-resolution electronic camera streaming live footage of your doorstep.',
      icon: Eye,
    },
    {
      step: '02',
      title: 'Super Wide 170° Field of View',
      desc: 'Ultra wide-angle optical lens eliminates blind spots, capturing full head-to-toe visitors and packages dropped outside your door.',
      icon: Monitor,
    },
    {
      step: '03',
      title: 'Dual Infrared Night Vision Illumination',
      desc: 'High-power infrared sensors activate automatically in pitch darkness so you can always see who is outside 24/7.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Direct Smartphone & Interior Screen Sync',
      desc: 'View live video instantly on the inside 4.0" HD color display screen or receive real-time push video notifications on the Tuya app.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="video-demo" className="py-14 sm:py-20 bg-gray-50 border-y border-gray-200 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3 tracking-wide">
            <Play className="w-3.5 h-3.5 fill-current text-red-600" />
            <span>OPTICAL CAMERA INSPECTION</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">SEE IT IN ACTION</span>
          </h2>
          <p className="mt-2.5 text-base sm:text-lg font-medium text-gray-600">
            Ultra wide-angle visual cat's eye camera with dual infrared night vision.
          </p>
        </div>

        {/* Main Video & Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-5xl mx-auto">
          {/* Video Player Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Phone-shaped video container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-900 bg-black aspect-[9/16] group">
              <video
                ref={videoRef}
                src="/videos/cats-eye-lens.mp4"
                poster="/assets/img/lock-wide-angle-eye.jpg"
                playsInline
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Overlay Top Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  OPTICAL CAT'S EYE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-200 text-[11px] font-bold border border-white/15">
                  170° WIDE ANGLE
                </span>
              </div>

              {/* Center Play/Pause Trigger */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] cursor-pointer transition-opacity group-hover:bg-black/45"
                >
                  <div className="w-18 h-18 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-transform">
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                  <span className="mt-3 text-xs font-black text-white uppercase tracking-wider bg-black/70 px-3.5 py-1 rounded-full border border-white/20">
                    TAP TO PLAY VIDEO
                  </span>
                </div>
              )}

              {/* Bottom Quick Controls Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl text-white border border-white/15 z-10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 hover:text-red-400 transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-1.5 hover:text-red-400 transition-colors cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-red-400" />
                        <span className="text-[11px] text-gray-300">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">Audio On</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-red-400 transition-colors cursor-pointer hidden sm:block"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-label */}
            <p className="text-center text-xs font-semibold text-gray-500 mt-3 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>A-01 Super Wide-Angle Cat's Eye Visual Sensor</span>
            </p>
          </div>

          {/* Video Breakdown Details & Features Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPTICAL HARDWARE SPECIFICATIONS</span>
            </div>
            <h3 className="font-black text-gray-900 tracking-tight text-2xl sm:text-3xl leading-snug">
              Visual Cat's Eye Doorbell & High-Definition Camera
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Equipped with a precision concentric optical lens and intelligent infrared sensors. Never wonder who is knocking at your door again.
            </p>

            {/* Highlights List */}
            <div className="mt-6 flex flex-col gap-3.5">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-black text-xs shrink-0">
                        {h.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <h4 className="font-bold text-gray-900 text-sm">
                            {h.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nationwide Nigeria Trust Guarantee */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-emerald-950 text-xs sm:text-sm">
                    100% Genuine Architectural Quality • Payment on Delivery
                  </h5>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    Heavy-duty build, tested for Nigerian climate and power standards. Inspect your lock upon arrival before paying the courier.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#order"
                className="flex-1 inline-flex items-center justify-center h-12 px-6 rounded-xl font-black text-sm tracking-wide text-white bg-red-600 hover:bg-red-700 active:scale-98 transition-all shadow-md shadow-red-600/20 text-center"
              >
                ORDER YOUR SMART LOCK NOW
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center h-12 px-5 rounded-xl font-bold text-xs tracking-wide text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-center"
              >
                VIEW QUANTITY DISCOUNTS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
