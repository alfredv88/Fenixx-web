"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videoList = isMobile ? ['/videos/hero-mobile.mp4'] : ['/videos/hero-1.mp4', '/videos/hero-3.mp4'];

  const locale = useLocale();
  const isArabic = locale === 'ar';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const monumentalY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const importX = useTransform(scrollYProgress, [0, 0.5], [0, isArabic ? 200 : -200]);
  const exportX = useTransform(scrollYProgress, [0, 0.5], [0, isArabic ? -200 : 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const monumentalOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0.05]);

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

  return (
    <section id="home" ref={containerRef} className="relative h-screen h-[100svh] w-full overflow-x-clip flex items-center bg-black">
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.0) translateX(0px); }
          to   { transform: scale(1.1) translateX(-15px); }
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        {videoList.map((src, i) => (
          <VideoLayer key={src} src={src} isActive={i === currentVideo} />
        ))}
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%),
            linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 50%)
          `
        }}
      />

      {/* Monumental Parallax Text */}
      <motion.div
        style={{ y: monumentalY, opacity: monumentalOpacity }}
        className="absolute bottom-12 left-0 w-full z-20 select-none pointer-events-none flex justify-center px-4 dir-ltr will-change-transform"
        dir="ltr"
      >
        <div className="flex items-center gap-4 md:gap-8 text-center leading-[0.8] font-black uppercase tracking-tighter whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 7.2vw, 9rem)' }}>
          <motion.span 
            style={{ x: importX }}
            className="text-white/90"
          >
            IMPORT
          </motion.span>
          
          <span className="text-white" style={{ fontSize: '50%', WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent', verticalAlign: 'middle' }}>&</span>

          <motion.span 
            style={{ x: exportX }}
            className="text-white/90"
          >
            EXPORT
          </motion.span>
        </div>
      </motion.div>

      {/* Content Block */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="absolute inset-0 z-30 flex justify-center md:justify-end items-center px-[clamp(1.5rem,6vw,8rem)]"
      >
        <div className="relative max-w-md lg:max-w-xl text-center md:text-end">
          {/* Vertical decorative line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute -end-8 md:-end-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-fenix-red-light)] to-transparent origin-top"
          />

          <motion.span
            initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-[var(--color-fenix-red-light)] font-black mb-6"
          >
            {t('labels.brand')}
          </motion.span>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,9vw,5rem)] font-black tracking-tighter leading-[0.95] uppercase mb-2 text-white"
          >
            {t('title.logistics')}
          </motion.h1>
          
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,9vw,5rem)] font-black tracking-tighter leading-[0.95] uppercase mb-6 text-[var(--color-fenix-red-light)]"
          >
            {t('title.integral')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <p className="text-[clamp(1rem,1.1vw,1.2rem)] text-white/60 font-medium max-w-lg ms-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-5 justify-center md:justify-end items-center"
          >
            <a
              href="#servicios"
              className="group relative bg-[var(--color-fenix-red-light)] text-white px-10 py-4 rounded-full font-black text-[13px] tracking-widest uppercase transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10">{t('cta')}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Ajustado para que siempre esté por encima de la letra & */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-[28vh] md:bottom-[32vh] left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-3 drop-shadow-md cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-black">{t('labels.scroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-[var(--color-fenix-red-light)]"
          />
        </div>
      </motion.a>
    </section>
  );
}

