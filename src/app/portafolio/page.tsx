"use client";
import React, { useState, useRef } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function PortafolioPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleText = "Portafolio";
  const letters = titleText.split("");

  const projects = [
    {
      id: 1,
      title: "Suministro Industrial Hubei - Valencia",
      category: "Transporte",
      tag: "Logística Integral",
      img: "/images/case-shanghai.png",
      stats: "Tránsito: 38 Días | Carga: 240 Tons",
      desc: "Gestión de suministro de componentes para la industria pesada desde el centro de China hasta puertos venezolanos."
    },
    {
      id: 2,
      title: "Izada de Maquinaria de Alta Precisión",
      category: "Especializados",
      tag: "Carga de Izada",
      img: "/images/case-maquinaria.png",
      stats: "Precisión: 100% | Carga: Grúa 120t",
      desc: "Operación de izada y posicionamiento de maquinaria industrial sobredimensionada utilizando equipos de última generación."
    },
    {
      id: 3,
      title: "Puente Logístico Houston - Latam",
      category: "Transporte",
      tag: "Multimodal",
      img: "/images/case-transporte.png",
      stats: "Frecuencia: Semanal | Tipo: Consolidado",
      desc: "Consolidación y despacho multimodal desde el hub de Houston para sectores de tecnología y energía."
    },
    {
      id: 4,
      title: "Gestión Aduanera y Nacionalización Crítica",
      category: "Aduanas",
      tag: "Aduanas",
      img: "/images/case-aduana.png",
      stats: "Eficiencia: 3 Días | Cumplimiento: 100%",
      desc: "Nacionalización express de suministros críticos para el sector infraestructura con riguroso cumplimiento normativo."
    }
  ];

  const filters = ['Todos', 'Transporte', 'Aduanas', 'Especializados'];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <Header variant="solid" />
      <main className="font-outfit" ref={containerRef}>
        
        {/* --- HERO SECTION --- */}
        <section className="bg-[#f7f7f7] pt-60 pb-32 px-8 overflow-hidden relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/images/hero-servicios.png"
              alt="Portafolio Fenixx"
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
              Nuestra Experiencia
            </motion.span>
            
            <h1 className="text-[clamp(45px,10vw,140px)] font-bold text-[#111111] leading-[0.9] tracking-[-0.05em] uppercase flex justify-center flex-wrap" aria-label="Portafolio">
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

          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[1px] border-black rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-black rounded-full" />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-black/20 font-bold">Ver Proyectos</span>
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
            <div className="flex flex-wrap justify-center gap-4 mb-24">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    activeFilter === f 
                    ? 'bg-[#FC3D03] text-white shadow-xl shadow-[#FC3D03]/20 scale-105' 
                    : 'bg-white text-gray-400 hover:text-black border border-gray-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
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
                        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 40px)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full h-full relative"
                      >
                        <img 
                          src={p.img} 
                          alt={p.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                           <span className="text-white text-[12px] uppercase tracking-[0.3em] font-bold border border-white/30 px-6 py-3 rounded-full backdrop-blur-sm">
                             Ver Detalles
                           </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] uppercase tracking-widest text-[#FC3D03] font-bold">{p.tag}</span>
                        <div className="h-[1px] flex-1 bg-gray-200" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#111111] leading-tight tracking-tight group-hover:text-[#FC3D03] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg mb-4">
                        {p.desc}
                      </p>
                      <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Análisis Operativo</span>
                        <span className="text-[12px] text-black font-bold tracking-tight">{p.stats}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400 italic">No hay proyectos disponibles en esta categoría.</p>
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
            <span className="text-[#FC3D03] font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block">Su carga es el próximo desafío</span>
            <h2 className="text-[clamp(32px,6vw,72px)] font-bold text-white leading-[1.05] tracking-tight uppercase mb-12">
              ¿Listo para mover <br /> su éxito con nosotros?
            </h2>
            <a 
              href="/#contacto" 
              className="inline-block bg-[#FC3D03] text-white px-12 py-5 rounded-full font-bold uppercase text-[12px] tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-[#FC3D03]/20"
            >
              Solicitar Cotización
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
