"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Process() {
  const t = useTranslations('Process');

  const stepsData = [
    {
      label: t('steps.0.label'),
      title: t('steps.0.title'),
      description: t('steps.0.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="16" height="13" rx="1.5" />
          <line x1="2" y1="8" x2="18" y2="8" />
          <path d="M7 10.5l3-1.5 3 1.5v3l-3 1.5-3-1.5z" />
          <path d="M7 10.5v3.2" />
          <path d="M10 12l3-1.5" />
          <path d="M10 12v3" />
          <path d="M15 13l6 6-2 1-1 2-6-6z" fill="white" />
          <path d="M15 13l6 6-2 1-1 2-6-6z" />
        </svg>
      )
    },
    {
      label: t('steps.1.label'),
      title: t('steps.1.title'),
      description: t('steps.1.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v3" />
          <path d="M10 5h4" />
          <rect x="4" y="8" width="16" height="10" rx="1" />
          <line x1="8" y1="8" x2="8" y2="18" />
          <line x1="12" y1="8" x2="12" y2="18" />
          <line x1="16" y1="8" x2="16" y2="18" />
          <circle cx="5.5" cy="9.5" r="0.5" fill="currentColor" />
          <circle cx="18.5" cy="9.5" r="0.5" fill="currentColor" />
        </svg>
      )
    },
    {
      label: t('steps.2.label'),
      title: t('steps.2.title'),
      description: t('steps.2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h18l-2 4H5z" />
          <path d="M7 10h4v4H7z" />
          <path d="M11 12h3v2h-3z" />
          <path d="M12 7v3" />
          <path d="M13 4c.5-1 2-1 2.5 0s0 2.5-1 2.5" />
          <path d="M3 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#f2f3f5] py-20 md:py-32 font-['Work_Sans',sans-serif]">
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start justify-center">

          {/* LEFT */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(26,26,46,0.4)', letterSpacing: '0.28em' }}
              className="text-[11px] uppercase font-bold block mb-5"
            >
              {t('badge')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-[38px] lg:text-[46px] font-semibold text-fenix-dark-graphite leading-[1.08] tracking-tight mb-8"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              style={{ color: '#6c757d' }}
              className="text-[16px] leading-[1.8] mb-12 max-w-[420px]"
            >
              {t('description')}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#contacto"
              className="inline-flex items-center justify-center bg-[#FC3D03] hover:bg-[#e03502] text-white px-9 py-4 rounded-full font-semibold text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-[#FC3D03]/25"
            >
              {t('button')}
            </motion.a>
          </div>

          {/* RIGHT — cards compactas con efecto Stacking */}
          <div className="w-full lg:w-7/12 max-w-[560px] flex flex-col">
            {stepsData.map((s, i) => (
              <div
                key={i}
                className="lg:sticky w-full mb-12 last:mb-0"
                style={{ 
                  top: `${140 + i * 45}px`, 
                  zIndex: 10 + i,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] flex flex-col min-h-[360px] px-10 py-12 lg:px-14 lg:py-16 border border-[#ebebeb] shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                >
                  <span
                    style={{ color: '#FC3D03', letterSpacing: '0.24em', fontSize: '11px', opacity: 0.9 }}
                    className="uppercase font-bold block mb-6"
                  >
                    {s.label}
                  </span>

                  <h3
                    style={{ color: '#000000' }}
                    className="text-[28px] lg:text-[32px] font-semibold leading-[1.2] mb-5 tracking-tight"
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{ color: '#555', fontSize: '16.5px', lineHeight: '1.75' }}
                    className="mb-0"
                  >
                    {s.description}
                  </p>

                  <div className="flex-grow" />

                  <div
                    style={{ color: 'rgba(252,61,3,0.35)', fill: 'none', stroke: 'rgba(252,61,3,0.35)' }}
                    className="mt-12 group-hover:[color:rgba(252,61,3,0.9)] transition-all duration-500"
                  >
                    {s.icon}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}