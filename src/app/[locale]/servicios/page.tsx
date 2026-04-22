"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function ServiciosPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('ServiciosPage');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleText = t('Hero.title');
  const letters = titleText.split("");

  const servicesKeys = ['transporte', 'aduana', 'manejo-carga', 'equipos'];
  const servicesImages: Record<string, string> = {
    'transporte': '/images/service-transporte.png',
    'aduana': '/images/service-aduanas.png',
    'manejo-carga': '/images/service-carga.png',
    'equipos': '/images/service-maquinaria.png'
  };

  return (
    <>
      <main className="font-outfit" ref={containerRef}>
        {/* --- HERO SECTION --- */}
        <section className="bg-[#f7f7f7] pt-60 pb-32 px-8 overflow-hidden relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/images/hero-servicios.png"
              alt="Industrial Background"
              className="w-full h-full object-cover opacity-[0.75] grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-white/20" />
          </div>

          <motion.div 
            style={{ y: yText }}
            className="max-w-[1320px] mx-auto text-center relative z-10"
          >
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[11px] uppercase tracking-[0.4em] text-[#FC3D03] font-bold block mb-6 px-4"
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
        <section className="bg-white py-32 px-8 border-b border-gray-100">
          <div className="max-w-[1320px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.211, 1, 0.32, 1] }}
              className="text-[clamp(28px,6vw,72px)] font-bold text-[#111111] leading-[1.05] tracking-tighter max-w-5xl"
            >
              {t.rich('Impact.headline', {
                accent: (chunks) => <span className="text-[#FC3D03]">{chunks}</span>
              })}
            </motion.h2>
          </div>
        </section>

        {/* --- DETAILED SECTIONS --- */}
        {servicesKeys.map((key, idx) => (
          <section 
            id={key} 
            key={key} 
            className={`py-40 px-8 ${idx % 2 === 1 ? 'bg-[#F7F7F7]' : 'bg-white'}`}
          >
            <div className="max-w-[1320px] mx-auto">
              <div className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20 lg:gap-36`}>
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#FC3D03] font-bold mb-6 block border-b border-[#FC3D03]/30 pb-3 w-fit">
                      {t('Items.label', { index: idx + 1 })}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-[#111111] leading-[1] mb-10 tracking-tight uppercase">
                      {t(`Items.${key}.title`)}
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed mb-12 max-w-xl font-light">
                      {t(`Items.${key}.description`)}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 mb-14">
                      {(t.raw(`Items.${key}.bullets`) as string[]).map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[12px] font-extrabold text-[#111111] uppercase tracking-widest">
                          <div className="w-2 h-2 bg-[#FC3D03] rounded-full rotate-45" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="/#contacto" 
                      className="inline-block bg-[#111111] text-white px-14 py-6 rounded-full font-bold uppercase text-[11px] tracking-[0.25em] hover:bg-[#FC3D03] transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-[#FC3D03]/20"
                    >
                      {t('Items.cta')}
                    </motion.a>
                  </motion.div>
                </div>
                {/* Image with Mask Reveal */}
                <div className="flex-1 w-full perspective-1000">
                  <motion.div 
                    initial={{ clipPath: "inset(10% 10% 10% 10% round 80px)", opacity: 0, scale: 0.9 }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 48px)", opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    className="relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] aspect-[4/3] lg:aspect-square group"
                  >
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                      src={servicesImages[key]} 
                      alt={t(`Items.${key}.title`)} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* --- CTA SECTION --- */}
        <section className="bg-[#111111] py-56 px-8 text-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#FC3D03] font-bold block mb-10">
              {t('CTA.badge')}
            </span>
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-14 leading-[0.9] tracking-tighter uppercase font-outfit">
              {t.rich('CTA.title', {
                br: () => <br />,
                accent: (chunks) => <span className="text-[#FC3D03]">{chunks}</span>
              })}
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12">
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                href="/#contacto" 
                className="bg-[#FC3D03] text-white px-16 py-8 rounded-full font-bold uppercase text-[12px] tracking-[0.3em] transition-all duration-500 shadow-2xl shadow-[#FC3D03]/20"
              >
                {t('CTA.button')}
              </motion.a>
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 right-0 p-10 opacity-10">
            <span className="text-[180px] font-bold text-white leading-none tracking-tighter select-none">FENIXX</span>
          </div>
        </section>
      </main>
    </>
  );
}
