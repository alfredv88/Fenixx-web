"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function About() {
  const t = useTranslations('About');

  return (
    <section
      id="nosotros"
      className="w-full bg-[#ebebeb] font-['Work_Sans',sans-serif] py-16 md:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 xl:px-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] uppercase tracking-[0.2em] text-[#FC3D03] font-bold block mb-12"
          >
            {t('badge')}
          </motion.span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start relative">
            {/* Left Column: Big Title */}
            <div className="col-span-1 lg:col-span-8">
              <h2 className="text-[32px] md:text-[56px] xl:text-[72px] leading-[1.1] md:leading-[1.05] font-semibold tracking-[-0.03em] max-w-[900px] text-black">
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                  className="block"
                >
                  {t('headline.part1')}
                </motion.span> 
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
                  className="block"
                >
                  {t('headline.part2')} <span className="relative whitespace-nowrap">{t('headline.accent')}<span className="absolute left-0 bottom-[6px] md:bottom-[8px] w-full h-[4px] md:h-[6px] bg-[#FC3D03] opacity-80 -z-10" /></span>
                </motion.span>
              </h2>
            </div>

            {/* Right Column: Info & Button */}
            <div className="col-span-1 lg:col-span-4 lg:pt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-start"
              >
                <p className="text-fenix-dark-graphite text-[16px] xl:text-[18px] font-medium leading-[1.6] mb-10 opacity-80">
                  {t('description')}
                </p>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="/nosotros"
                    className="group inline-flex items-center gap-3 text-fenix-dark-graphite font-bold text-[16px] uppercase tracking-wider"
                  >
                    <span>{t('cta')}</span>
                    <div className="w-10 h-[2px] bg-[#FC3D03] transition-all group-hover:w-16" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
