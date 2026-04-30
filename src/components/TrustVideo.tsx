"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TrustVideo() {
  const t = useTranslations('TrustVideo');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Efecto de achicamiento al salir (Scale: 1 -> 0.85, Border: 0 -> 40px)
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.7], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[120vh] bg-black flex items-start justify-center"
    >
      <motion.div
        style={{ 
          scale, 
          borderRadius, 
          opacity,
          position: 'sticky',
          top: '5vh'
        }}
        className="relative w-full h-[90vh] overflow-hidden bg-black shadow-2xl"
      >
        {/* Background Video with Parallax effect */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60 grayscale-[0.3] brightness-[0.7]"
          >
            <source src="/videos/fenixx-ops.mp4" type="video/mp4" />
          </video>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
        </motion.div>

        {/* Content */}
        <div className="relative h-full w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col justify-center items-center text-center z-20">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-fenix-red-light font-bold text-xs md:text-sm tracking-[0.3em] uppercase block mb-6"
            >
              {t('badge')}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {t.rich('title', {
                orange: (chunks) => <span className="text-fenix-red-light">{chunks}</span>
              })}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              {t('description')}
            </motion.p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-24 h-1 bg-fenix-red-light mx-auto mt-12"
            />
          </div>
        </div>

        {/* Edge Blur - Enhanced */}
        <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
      </motion.div>
    </section>
  );
}
