"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      key: 'transporte',
      image: "/images/service-transporte.png",
      alt: "Transporte Multimodal"
    },
    {
      key: 'aduana',
      image: "/images/service-aduanas.png",
      alt: "Gestión Aduanera"
    },
    {
      key: 'carga',
      image: "/images/service-carga.png",
      alt: "Manejo de Carga"
    },
    {
      key: 'equipos',
      image: "/images/service-maquinaria.png",
      alt: "Alquiler de Equipos"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }
    }
  };

  return (
    <section id="servicios" className="w-full bg-[#f6f6f6] py-16 md:py-24 lg:py-24">
      <div className="w-full px-4 md:px-8 xl:px-16 mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0 divide-y divide-[#cccccc]"
        >
          
          {/* Info Column */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center pr-0 lg:pr-8 xl:pr-12 pt-[40px] pb-[40px] md:pb-[80px] h-full">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fenix-red-light)] font-bold block mb-5">
              {t('badge')}
            </span>
            <div className="overflow-hidden mb-8">
              <h2 className="text-[40px] xl:text-[46px] leading-[1.05] font-bold text-fenix-dark-graphite tracking-[-0.02em] font-outfit">
                {t('title')}
              </h2>
            </div>
            <p className="text-fenix-dark-graphite text-[15px] xl:text-[16px] leading-relaxed mb-auto pb-12 pr-4 opacity-80 font-inter">
              {t('description')}
            </p>
            <div className="mt-auto">
              <Link 
                href="/servicios" 
                className="inline-flex items-center justify-center bg-[var(--color-fenix-red-light)] hover:bg-[var(--color-fenix-red-dark)] text-white px-9 py-4 rounded-full font-medium text-[16px] transition-all duration-300 hover:scale-105 shadow-premium"
              >
                {t('cta')}
              </Link>
            </div>
          </motion.div>

          {/* Services List */}
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col px-4 xl:px-8 pt-[40px] pb-[80px] h-full justify-start transition-all duration-500 hover:bg-white group"
            >
              <div className="w-full aspect-[4/3] 2xl:aspect-square mb-8 overflow-hidden rounded-[20px] shadow-sm relative">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={service.image} 
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-[22px] xl:text-[26px] font-bold text-fenix-dark-graphite mb-3 tracking-[-0.02em] font-outfit">
                {t(`items.${service.key}.title`)}
              </h3>
              <p className="text-fenix-dark-graphite text-[14px] xl:text-[16px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity font-inter">
                {t(`items.${service.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
