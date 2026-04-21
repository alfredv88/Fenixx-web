"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ variant = 'transparent' }: { variant?: 'transparent' | 'solid' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Portafolio', href: '/#portafolio' },
    { name: 'Contáctanos', href: '/#contacto' },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`top-0 left-0 w-full z-[9999] transition-all duration-500 font-outfit ${
          (isScrolled || variant === 'solid')
            ? 'fixed bg-white py-2 shadow-[0_4px_30px_rgba(0,0,0,0.03)] animate-[slide-down_0.4s_ease-out]' 
            : 'absolute bg-transparent py-5'
        }`}
      >
        <div 
          className={`absolute bottom-0 left-0 w-full h-[1px] bg-gray-200/30 transition-opacity duration-300 pointer-events-none ${
            (isScrolled || variant === 'solid') ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        <nav className="max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24 flex justify-between items-center">
          <div className="flex items-center gap-2 relative z-[10000]">
            <a href="/" className="block">
              <img
                src="/images/logo.png"
                alt="Fenixx Logo"
                className={`w-auto object-contain transition-all duration-500 logo-img ${(isScrolled || variant === 'solid') ? 'h-8 md:h-9' : 'h-14 md:h-18'}`}
                style={{ 
                  filter: (isScrolled || variant === 'solid') ? 'none' : 'brightness(1.1) saturate(1.1)'
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 ml-auto">
            <ul className="flex items-center gap-10">
              {menuItems.map((item, i) => {
                const isServices = item.name === 'Servicios';
                
                return (
                  <li 
                    key={i} 
                    className="relative group py-2"
                    onMouseEnter={isServices ? handleMouseEnter : undefined}
                    onMouseLeave={isServices ? handleMouseLeave : undefined}
                  >
                    <a
                      href={item.href}
                      className={`nav-link font-bold text-[13px] uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 ${
                        (isScrolled || variant === 'solid') ? 'text-black hover:text-[#FC3D03]' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isServices && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="10" height="10" viewBox="0 0 24 24" 
                          fill="none" stroke="currentColor" strokeWidth="4" 
                          strokeLinecap="round" strokeLinejoin="round" 
                          className={`mt-0.5 transition-transform duration-500 ${isServicesOpen ? 'rotate-180 text-[#FC3D03]' : ''}`}
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      )}
                    </a>
                    <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[#FC3D03] transition-all duration-300 group-hover:w-full ${isServicesOpen && isServices ? 'w-full' : ''}`} />
                  </li>
                );
              })}
            </ul>

            <div className={`flex items-center gap-6 border-l pl-10 ml-2 ${(isScrolled || variant === 'solid') ? 'border-gray-200' : 'border-white/20'}`}>
              <a href="#" className={`nav-link transition-all duration-300 hover:scale-125 hover:text-[#FC3D03] ${(isScrolled || variant === 'solid') ? 'text-black' : 'text-white/80'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.746m2.464 -2.454l6.768 -6.8"/></svg>
              </a>
              <a href="#" className={`nav-link transition-all duration-300 hover:scale-125 hover:text-[#FC3D03] ${(isScrolled || variant === 'solid') ? 'text-black' : 'text-white/80'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 p-2 transition-all relative z-[10001] ${(isScrolled || variant === 'solid' || isMenuOpen) ? 'text-black' : 'text-white'}`}
          >
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-7 h-[1.5px] bg-current block" />
            <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[1.5px] bg-current ml-auto block" />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-7 h-[1.5px] bg-current block" />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-[10000] flex flex-col pt-32 px-10"
            >
              <div className="flex flex-col gap-8">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-bold text-black uppercase tracking-tighter hover:text-[#FC3D03] transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto pb-10 flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black">X</a>
                <a href="#" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black">In</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Container - Desktop only */}
        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute left-0 w-full px-8 md:px-16 lg:px-24 top-full pt-4 hidden lg:block"
            >
              <div className="bg-white rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden min-h-[420px] w-full border border-gray-500 flex relative z-[99999]">
                
                {/* Left Sidebar: Text Navigation */}
                <div className="w-[260px] bg-white border-r border-gray-50 p-10 flex flex-col font-outfit">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-8 border-b border-gray-50 pb-4">
                    Servicios
                  </span>
                  <div className="flex flex-col gap-6 relative">
                    {[
                      { name: 'Gestión Aduanera', slug: 'aduana' },
                      { name: 'Transporte Internacional', slug: 'transporte' },
                      { name: 'Carga Comercial', slug: 'manejo-carga' },
                      { name: 'Equipos Industriales', slug: 'equipos' },
                      { name: 'Almacén y Stock', slug: 'almacen' }
                    ].map((s, idx) => (
                      <a 
                        key={idx}
                        href={`/servicios#${s.slug}`}
                        className="group flex items-center gap-3 text-[13px] uppercase tracking-[0.1em] font-bold text-[#111111] hover:text-[#FC3D03] transition-all duration-300"
                      >
                        <div className="w-0 group-hover:w-1.5 h-1.5 bg-[#FC3D03] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        {s.name}
                      </a>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <a href="/servicios" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#FC3D03] hover:text-black transition-all group">
                      Ver Catálogo
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>

                {/* Right Panel: Visual Grid */}
                <div className="flex-1 p-10 bg-[#F9FAFB]/30 font-outfit">
                  <div className="grid grid-cols-5 gap-5 h-full">
                    {[
                      { name: 'Aduana', img: '/images/menu-aduana.png', slug: 'aduana' },
                      { name: 'Transporte', img: '/images/menu-transporte.png', slug: 'transporte' },
                      { name: 'Carga', img: '/images/menu-carga.png', slug: 'manejo-carga' },
                      { name: 'Heavy Lift', img: '/images/menu-heavylift.png', slug: 'equipos' },
                      { name: 'Warehouse', img: '/images/menu-warehouse.png', slug: 'almacen' }
                    ].map((s, idx) => (
                      <motion.a 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        key={idx}
                        href={`/servicios#${s.slug}`}
                        className="group flex flex-col gap-4 font-outfit"
                      >
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden relative shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_-10px_rgba(252,61,3,0.15)] transition-all duration-500">
                          <img 
                            src={s.img} 
                            alt={s.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-3 left-0 w-full text-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">+ Info</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-1">
                          <span className="text-[13px] uppercase tracking-[0.1em] font-bold text-[#111111] group-hover:text-[#FC3D03] transition-colors duration-300">
                            {s.name}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated shimmer line */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none"
            >
              <div className="shimmer-glow" />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes shimmer-move {
          0%   { transform: translateX(-40%); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateX(60%); opacity: 0.7; }
          90%  { opacity: 1; }
          100% { transform: translateX(160%); opacity: 0; }
        }
        .shimmer-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(252, 61, 3, 0.15) 20%,
            rgba(252, 61, 3, 0.65) 50%,
            rgba(252, 61, 3, 0.15) 80%,
            transparent 100%
          );
          box-shadow: 0 0 10px 2px rgba(252, 61, 3, 0.25), 0 0 25px 4px rgba(252, 61, 3, 0.1);
          animation: shimmer-move 3s ease-in-out infinite;
        }
      `}} />
    </>
  );
}
