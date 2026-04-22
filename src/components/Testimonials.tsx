"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const [isPaused, setIsPaused] = useState(false);

  // Obtenemos los items dinámicamente desde el JSON
  const testimonials = t.raw('items');
  // Duplicamos el set de cartas para el scroll infinito suave
  const tickerCards = [...testimonials, ...testimonials];

  return (
    <section 
      className="py-16 md:py-24 lg:py-64 bg-fenix-gray-industrial overflow-hidden"
    >
      <div className="w-full">

        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-20">
          <div className="md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-2">
            <span className="text-[14px] uppercase tracking-[0.2em] text-[#FC3D03] font-bold block pt-2">
              {t('badge')}
            </span>
          </div>
          <div className="md:col-start-6 md:col-span-6 lg:col-start-6 lg:col-span-5">
            <p className="text-fenix-dark-graphite text-[15px] xl:text-[16px] leading-[1.7]">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Infinite Ticker Container */}
        <div 
          className="relative flex overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Faded edges to give premium depth */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-fenix-gray-industrial to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-fenix-gray-industrial to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-6 py-4"
            animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {tickerCards.map((item: any, i: number) => (
              <div 
                key={i} 
                className="w-[240px] md:w-[450px] flex-shrink-0 bg-white rounded-[20px] p-5 md:p-8 xl:p-10 flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starI) => (
                    <svg key={starI} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#fc9003">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="text-fenix-dark-graphite text-[14px] md:text-[15px] leading-[1.6] mb-6 flex-grow italic">"{item.quote}"</p>
                <div className="flex items-center gap-3 mt-auto border-t border-gray-100 pt-6">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  <div>
                    <p className="text-[14px] font-bold text-fenix-dark-graphite leading-tight">{item.name}</p>
                    <p className="text-[12px] text-[#FC3D03] font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
