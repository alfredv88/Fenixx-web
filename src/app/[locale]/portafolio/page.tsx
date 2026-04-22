"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PortafolioPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('Portafolio');
  
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleText = t('Hero.title');
  const letters = titleText.split("");

  const projects = [
    {
      id: 1,
      key: 'hubei',
      category: 'transporte',
      img: "/images/case-shanghai.png",
    },
    {
      id: 2,
      key: 'izada',
      category: 'especializados',
      img: "/images/case-maquinaria.png",
    },
    {
      id: 3,
      key: 'houston',
      category: 'transporte',
      img: "/images/case-transporte.png",
    },
    {
      id: 4,
      key: 'aduanas_critica',
      category: 'aduanas',
      img: "/images/case-aduana.png",
    }
  ];

  const filters = [
    { key: 'all', label: t('Filters.all') },
    { key: 'transporte', label: t('Filters.transporte') },
    { key: 'aduanas', label: t('Filters.aduanas') },
    { key: 'especializados', label: t('Filters.especializados') }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <main className="font-outfit" ref={containerRef}>
        
        {/* --- HERO SECTION --- */}
        <section className="bg-[#f7f7f7] pt-60 pb-32 px-8 overflow-hidden relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/images/hero-servicios.png"
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

          <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[0.5px] border-black rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-black rounded-full" />
            {/* Industrial Scan Line */}
            <motion.div 
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FC3D03]/40 to-transparent"
            />
          </div>

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

        {/* --- GRID SECTION --- */}
        <section className="py-32 px-8">
          <div className="max-w-[1320px] mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-6 mb-24 relative z-20">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`relative px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-black transition-all duration-500 ${
                    activeFilter === f.key 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {f.label}
                  {activeFilter === f.key && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-[#FC3D03] shadow-[0_0_15px_#FC3D03]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] mb-8 overflow-hidden">
                      <motion.div
                        initial={{ clipPath: "inset(10% 10% 10% 10% round 80px)" }}
                        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full h-full relative"
                      >
                        <img 
                          src={p.img} 
                          alt={t(`Projects.items.${p.key}.title`)} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 contrast-125" 
                        />
                        
                        {/* HUD Technical Borders */}
                        <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-3xl pointer-events-none" />
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/40 flex items-start justify-start p-1">
                           <div className="w-1 h-1 bg-white/20 rounded-full" />
                        </div>
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/40 flex items-end justify-end p-1">
                           <div className="w-1 h-1 bg-white/20 rounded-full" />
                        </div>

                        {/* Interactive HUD Overlay */}
                        <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-12 backdrop-blur-[2px]">
                           <span className="text-white text-[10px] uppercase tracking-[0.4em] font-black mb-4 border-b border-[#FC3D03] pb-2">
                             Analysis Mode: {p.category}
                           </span>
                           <div className="flex flex-col items-center gap-1 mb-8 opacity-60">
                             <span className="text-white/80 text-[9px] font-mono tracking-widest uppercase">LAT: 10.4880-N</span>
                             <span className="text-white/80 text-[9px] font-mono tracking-widest uppercase">LON: 66.9036-W</span>
                           </div>
                           <span className="bg-white text-black text-[10px] uppercase tracking-[0.3em] font-black px-8 py-3.5 rounded-full shadow-2xl shadow-orange-500/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                             {t('Projects.details')}
                           </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] uppercase tracking-widest text-[#FC3D03] font-bold">{t(`Projects.items.${p.key}.tag`)}</span>
                        <div className="h-[1px] flex-1 bg-gray-200" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#111111] leading-tight tracking-tight group-hover:text-[#FC3D03] transition-colors">
                        {t(`Projects.items.${p.key}.title`)}
                      </h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg mb-4">
                        {t(`Projects.items.${p.key}.description`)}
                      </p>
                      <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('Projects.analysis')}</span>
                        <span className="text-[12px] text-black font-bold tracking-tight">{t(`Projects.items.${p.key}.stats`)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400 italic">{t('Empty')}</p>
              </div>
            )}

          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="bg-[#111111] py-40 px-8 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-white/5 rounded-full pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <span className="text-[#FC3D03] font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block">{t('CTA.badge')}</span>
            <h2 className="text-[clamp(32px,6vw,72px)] font-bold text-white leading-[1.05] tracking-tight uppercase mb-12">
              {t.rich('CTA.title', {
                br: () => <br />
              })}
            </h2>
            <a 
              href="/#contacto" 
              className="inline-block bg-[#FC3D03] text-white px-12 py-5 rounded-full font-bold uppercase text-[12px] tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-[#FC3D03]/20"
            >
              {t('CTA.button')}
            </a>
          </motion.div>
        </section>

      </main>
    </>
  );
}
