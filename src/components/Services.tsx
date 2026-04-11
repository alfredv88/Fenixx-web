"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Transporte Multimodal",
    description: "Cobertura total y coordinación estratégica en conexiones marítimas, aéreas y terrestres.",
    image: "/images/service-transporte.png",
    alt: "Transporte Multimodal"
  },
  {
    title: "Gestión Aduanera",
    description: "Aceleramos tiempos con asesoría especializada y nacionalización eficiente de carga.",
    image: "/images/service-aduanas.png",
    alt: "Gestión Aduanera"
  },
  {
    title: "Manejo de Carga",
    description: "Precisión técnica para carga suelta o izada de piezas y maquinaria de gran dimensión.",
    image: "/images/service-carga.png",
    alt: "Manejo de Carga"
  },
  {
    title: "Alquiler de Equipos",
    description: "Flota moderna y herramientas especializadas para optimizar toda su operación.",
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

export default function Services() {
  return (
    <section id="servicios" className="w-full bg-[#f6f6f6] font-['Work_Sans',sans-serif] py-16 md:py-24 lg:py-24">
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
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#FC3D03] font-bold block mb-5">
              Portafolio de Servicios
            </span>
            <div className="overflow-hidden mb-8">
              <h2 className="text-[40px] xl:text-[46px] leading-[1.05] font-semibold text-fenix-dark-graphite tracking-[-0.02em]">
                Capacidad Estratégica
              </h2>
            </div>
            <p className="text-fenix-dark-graphite text-[15px] xl:text-[16px] leading-relaxed mb-auto pb-12 pr-4 opacity-80">
              Cubrimos todas las modalidades de transporte con la infraestructura necesaria para su operación.
            </p>
            <div className="mt-auto">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#servicios" 
                className="inline-flex items-center justify-center bg-[#FC3D03] hover:bg-[#e33702] text-white px-9 py-4 rounded-full font-medium text-[16px] transition-colors shadow-premium"
              >
                Más Detalles
              </motion.a>
            </div>
          </motion.div>

          {/* Services List */}
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col px-4 xl:px-8 pt-[40px] pb-[80px] h-full justify-start transition-all duration-500 hover:bg-white/40 group"
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
                <div className="absolute inset-0 bg-fenix-red-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-[22px] xl:text-[26px] font-medium text-fenix-dark-graphite mb-3 tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="text-fenix-dark-graphite text-[14px] xl:text-[16px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
