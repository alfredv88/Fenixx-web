"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function NosotrosPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('Nosotros');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleText = t('Hero.title');
  const letters = titleText.split("");

  return (
    <>
      <main className="font-outfit" ref={containerRef}>
        {/* --- HERO SECTION --- */}
        <section className="bg-[#f7f7f7] pt-60 pb-32 px-8 overflow-hidden relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/images/hero-nosotros.png"
              alt={t('Hero.title')}
              className="w-full h-full object-cover opacity-[0.75] grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-white/15" />
          </div>

          <motion.div 
            style={{ y: yText }}
            className="max-w-[1320px] mx-auto text-center relative z-10"
          >
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-[#FC3D03] font-bold block mb-6 px-4"
            >
              {t('Hero.badge')}
            </motion.span>
            
            <h1 className="text-[clamp(45px,10vw,140px)] font-bold text-[#111111] leading-[0.9] tracking-[-0.05em] uppercase flex justify-center flex-wrap" aria-label={titleText}>
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2 + (i * 0.05),
                    ease: [0.211, 1, 0.32, 1]
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-black/20 font-bold">{t('Hero.scroll')}</span>
            <div className="w-[18px] h-[30px] border border-black/10 rounded-full relative">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0, 0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[6px] bg-black/30 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* --- BIG BOLD IMPACT SECTION --- */}
        <section className="bg-white py-24 md:py-32 px-8 border-b border-gray-100">
          <div className="max-w-[1320px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.211, 1, 0.32, 1] }}
              className="text-[clamp(28px,5vw,56px)] font-bold text-[#111111] leading-[1.1] tracking-[-0.02em] max-w-4xl"
            >
              {t.rich('Impact.headline', {
                accent: (chunks) => <span className="text-[#FC3D03]">{chunks}</span>
              })}
            </motion.h2>
          </div>
        </section>

        {/* --- CONTENT MANIFIESTO --- */}
        <section className="py-24 md:py-32 px-8 bg-[#F7F7F7]">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              <div className="lg:w-5/12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[#FC3D03] mb-8 block">{t('Manifesto.badge')}</span>
                  <p className="text-[18px] md:text-[22px] leading-[1.6] text-gray-800 font-medium mb-8">
                    {t('Manifesto.title')}
                  </p>
                  <p className="text-[16px] md:text-[18px] leading-[1.7] text-gray-600">
                    {t('Manifesto.description')}
                  </p>
                </motion.div>
              </div>

              <div className="lg:w-7/12 relative">
                <motion.div
                  initial={{ clipPath: "inset(10% 10% 10% 10% round 80px)", opacity: 0, scale: 0.92 }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0% round 48px)", opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                  className="relative w-full aspect-[4/3] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group"
                >
                  <img src="/images/case-aduana.png" alt="Centro de Operaciones" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-0 w-full px-8 flex justify-center text-center">
                    <p className="text-white font-bold text-[22px] md:text-[32px] max-w-2xl leading-tight">
                      "{t('Manifesto.quote')}"
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* --- STATS SECTION (Authority & Contrast) --- */}
        <section className="bg-[#111111] py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
            <span className="text-[25vw] font-black leading-none uppercase text-white">Fenixx</span>
          </div>

          <div className="max-w-[1320px] mx-auto px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { key: 'experience', delay: 0.1 },
                { key: 'security', delay: 0.2 },
                { key: 'projects', delay: 0.3 },
                { key: 'reach', delay: 0.4 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: stat.delay }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="text-[48px] md:text-[64px] font-bold text-[#FC3D03] mb-2 tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">
                    {t(`Stats.${stat.key}.value`)}
                  </div>
                  <div className="h-[1px] w-8 bg-white/20 mb-4 group-hover:w-16 transition-all duration-500" />
                  <div className="text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-white/50 font-bold max-w-[150px]">
                    {t(`Stats.${stat.key}.label`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VALORES SECTION --- */}
        <section className="bg-[#F9FAFB] py-32 px-8">
          <div className="max-w-[1320px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[#FC3D03] mb-4 block">{t('Promise.badge')}</span>
              <h3 className="text-[36px] md:text-[48px] font-bold text-[#111111] leading-tight tracking-tight">
                {t.rich('Promise.title', {
                  br: () => <br className="hidden md:block" />
                })}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { key: 'integral', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { key: 'security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
                { key: 'speed', icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              ].map((v, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="bg-[#fcfcfc] border border-gray-100 p-10 rounded-[32px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:bg-[#FC3D03] transition-colors duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon}/></svg>
                  </div>
                  <h4 className="text-[22px] font-bold text-[#111111] mb-4 tracking-tight">{t(`Promise.items.${v.key}.title`)}</h4>
                  <p className="text-gray-600 leading-relaxed text-[16px]">{t(`Promise.items.${v.key}.description`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
