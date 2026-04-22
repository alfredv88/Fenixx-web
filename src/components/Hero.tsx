"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Individual video layer: always rendered, visibility controlled by opacity
function VideoLayer({ src, isActive }: { src: string; isActive: boolean }) {
  return (
    <div
      className="absolute inset-0 w-full h-full transition-opacity duration-[3000ms] ease-in-out"
      style={{ opacity: isActive ? 1 : 0 }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: 'kenBurns 12s ease-in-out infinite alternate' }}
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Detect dimension for responsive video selection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use hero-mobile only on mobile, rotate 1 & 3 on desktop
  const videoList = isMobile ? ['/videos/hero-mobile.mp4'] : ['/videos/hero-1.mp4', '/videos/hero-3.mp4'];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const monumentalY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Video rotation logic (only if more than 1 video)
  useEffect(() => {
    if (videoList.length <= 1) {
      setCurrentVideo(0);
      return;
    }
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [videoList.length]);

  // Ensure currentVideo index is valid after resize
  useEffect(() => {
    if (currentVideo >= videoList.length) {
      setCurrentVideo(0);
    }
  }, [videoList.length, currentVideo]);

  return (
    <section ref={containerRef} className="relative h-screen h-[100svh] w-full overflow-x-clip flex items-center">
      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.0) translateX(0px); }
          to   { transform: scale(1.08) translateX(-12px); }
        }
      `}</style>

      {/* Video Background — all layers stacked, opacity = visibility */}
      <div className="absolute inset-0 z-0 bg-black">
        {videoList.map((src, i) => (
          <VideoLayer key={src} src={src} isActive={i === currentVideo} />
        ))}
      </div>

      {/* Deep premium vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%),
            linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 15%, transparent 50%),
            linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)
          `
        }}
      />

      {/* Monumental Parallax Text */}
      <motion.div
        style={{ y: monumentalY }}
        className="absolute bottom-12 left-0 w-full z-20 select-none pointer-events-none flex justify-center px-4"
      >
        <span className="font-black text-fenix-white-soft uppercase tracking-tighter whitespace-nowrap opacity-20 md:opacity-100 text-center leading-[0.8]" style={{ fontSize: 'clamp(2rem, 7.5vw, 10rem)' }}>
          IMPORT <span style={{ fontSize: '50%', WebkitTextStroke: '2px #f9fafb', color: 'transparent', verticalAlign: 'middle' }}>&</span> EXPORT
        </span>
      </motion.div>

      {/* Content Block */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="absolute inset-0 z-30 flex justify-center md:justify-end items-center px-6 md:pr-12 lg:pr-24"
      >
        <div className="relative max-w-md lg:max-w-xl text-center md:text-right">

          {/* Vertical decorative line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute -right-6 md:-right-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FC3D03] to-transparent origin-top"
          />

          {/* Brand Label */}
          <motion.span
            initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[11px] md:text-[13px] uppercase tracking-[0.35em] text-[#FC3D03] font-bold mb-5"
          >
            {t('labels.brand')}
          </motion.span>

          {/* Line 1 — White */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] md:text-[45px] lg:text-[70px] font-bold tracking-tighter leading-[1.05] uppercase mb-1"
            style={{ color: 'var(--color-fenix-white-soft)' }}
          >
            {t('title.logistics')}
          </motion.h1>
          {/* Line 2 — Brand Red */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] md:text-[45px] lg:text-[70px] font-bold tracking-tighter leading-[1.05] uppercase mb-4"
            style={{ color: '#FC3D03' }}
          >
            {t('title.integral')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-10"
          >
            <p className="text-sm lg:text-lg text-white/70 font-medium max-w-sm lg:max-w-lg ml-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 justify-center md:justify-end items-center"
          >
            <a
              href="#servicios"
              className="bg-[#FC3D03] hover:bg-[#e33702] text-white px-7 py-3 rounded-full font-medium text-[14px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-premium"
            >
              {t('cta')}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium">{t('labels.scroll')}</span>
        <div className="w-[18px] h-[30px] border border-white/15 rounded-full relative">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[6px] bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
