"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function Header({ variant }: { variant?: 'transparent' | 'solid' }) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const currentPathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  
  // High-fidelity logic: determine variant based on path or prop
  const isHome = currentPathname === '/';
  const effectiveVariant = variant || (isHome ? 'transparent' : 'solid');
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

  const switchLanguage = (newLocale: 'en' | 'es') => {
    router.replace(currentPathname, { locale: newLocale });
  };

  const menuItems = [
    { name: t('nav.home'), href: '/' as any },
    { name: t('nav.about'), href: '/nosotros' as any },
    { name: t('nav.services'), href: '/servicios' as any },
    { name: t('nav.portfolio'), href: '/portafolio' as any },
    { name: t('nav.contact'), href: '/#contacto' as any },
  ];

  const megaMenuLinks = [
    { name: t('megaMenu.categories.aduana'), slug: 'aduana' },
    { name: t('megaMenu.categories.transporte'), slug: 'transporte' },
    { name: t('megaMenu.categories.carga'), slug: 'manejo-carga' },
    { name: t('megaMenu.categories.equipos'), slug: 'equipos' },
    { name: t('megaMenu.categories.almacen'), slug: 'almacen' }
  ];

  return (
    <>
      <header
        id="main-header"
        className={`top-0 left-0 w-full z-[9999] transition-all duration-700 font-outfit ${
          (isScrolled || effectiveVariant === 'solid')
            ? 'fixed bg-white/90 backdrop-blur-xl py-2 shadow-[0_4px_30px_rgba(0,0,0,0.03)] animate-slide-down' 
            : 'absolute bg-transparent py-5'
        }`}
      >
        <div 
          className={`absolute bottom-0 left-0 w-full h-[1px] bg-gray-200/30 transition-opacity duration-300 pointer-events-none ${
            (isScrolled || effectiveVariant === 'solid') ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        <nav className="max-w-[1920px] mx-auto px-[clamp(1.5rem,5vw,6rem)] flex justify-between items-center">
          <div className="flex items-center gap-2 relative z-[10000]">
            <Link href="/" className="block">
              <img
                src="/images/logo.png"
                alt="Fenixx Logo"
                className={`w-auto object-contain transition-all duration-500 logo-img ${(isScrolled || effectiveVariant === 'solid') ? 'h-8 md:h-9' : 'h-14 md:h-18'}`}
                style={{ 
                  filter: (isScrolled || effectiveVariant === 'solid') ? 'none' : 'brightness(1.1) saturate(1.1)'
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 ml-auto">
            <ul className="flex items-center gap-10">
              {menuItems.map((item, i) => {
                const isServices = item.href === '/servicios';
                
                return (
                  <li 
                    key={i} 
                    className="relative group py-2"
                    onMouseEnter={isServices ? handleMouseEnter : undefined}
                    onMouseLeave={isServices ? handleMouseLeave : undefined}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link font-bold text-[clamp(11px,0.8vw,13px)] uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 ${
                        (isScrolled || effectiveVariant === 'solid') ? 'text-black hover:text-[#FC3D03]' : 'text-white/90 hover:text-white'
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
                    </Link>
                    <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[#FC3D03] transition-all duration-300 group-hover:w-full ${isServicesOpen && isServices ? 'w-full' : ''}`} />
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher & Social */}
            <div className={`flex items-center gap-6 border-l pl-10 ml-2 ${(isScrolled || effectiveVariant === 'solid') ? 'border-gray-200' : 'border-white/20'}`}>
              
              {/* Language Switcher Component */}
              <div className="flex items-center gap-3 mr-4">
                {['es', 'en', 'ar'].map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLanguage(l as any)}
                    className={`text-[clamp(10px,0.7vw,11px)] font-black uppercase tracking-widest transition-all duration-300 relative py-1 ${
                      locale === l 
                        ? (isScrolled || effectiveVariant === 'solid' ? 'text-black' : 'text-white')
                        : 'text-gray-400/60 hover:text-[#FC3D03]'
                    }`}
                  >
                    {l}
                    {locale === l && (
                      <motion.div 
                        layoutId="activeLang"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FC3D03]" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {[
                { name: 'X', path: 'M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.746m2.464 -2.454l6.768 -6.8', viewbox: '0 0 24 24' },
                { name: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12h-4z M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', viewbox: '0 0 24 24' },
                { name: 'Instagram', path: 'M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4038 15.9059C10.5691 15.7723 9.79055 15.3798 9.17643 14.7822C8.56231 14.1846 8.14005 13.4116 7.9675 12.5714C7.79495 11.7311 7.88124 10.8601 8.21441 10.0768C8.54758 9.29348 9.11147 8.63661 9.8277 8.19504C10.5439 7.75348 11.3789 7.54897 12.22 7.6094C13.914 7.7303 15.269 9.0853 15.39 10.779C15.3976 10.978 15.4011 11.1774 15.4005 11.3768L16 11.37Z M17.5 6.5H17.51', viewbox: '0 0 24 24' },
                { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', viewbox: '0 0 24 24' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[#FC3D03] hover:border-[#FC3D03] hover:text-white ${(isScrolled || effectiveVariant === 'solid') ? 'border-gray-200 text-black' : 'border-white/20 text-white/80'}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" height="14" 
                    viewBox={social.viewbox} 
                    fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 p-2 transition-all relative z-[10001] ${(isScrolled || effectiveVariant === 'solid' || isMenuOpen) ? 'text-black' : 'text-white'}`}
          >
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-7 h-[1.5px] bg-current block" />
            <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[1.5px] bg-current ml-auto block" />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-7 h-[1.5px] bg-current block" />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] lg:hidden"
              />
              
              {/* Menu Panel (Slim & Delicate) */}
              <motion.div
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 35, stiffness: 400 }}
                className="fixed top-0 right-0 w-[75%] sm:w-[45%] lg:w-[30%] bg-white z-[10000] flex flex-col pt-32 px-[clamp(2rem,6vw,4rem)] h-[100svh] shadow-[-20px_0_60px_rgba(0,0,0,0.08)] rounded-l-[40px] border-l border-gray-50"
              >
                {/* Language Switcher Mobile (Ultra Thin) */}
                <div className="flex gap-8 mb-16 border-b border-gray-50 pb-8 uppercase tracking-[0.3em] font-black text-[9px] opacity-60">
                  {['es', 'en', 'ar'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { switchLanguage(l as any); setIsMenuOpen(false); }}
                      className={`transition-all duration-300 ${locale === l ? 'text-[#FC3D03] scale-110' : 'text-gray-400 hover:text-black'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-10">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[clamp(1.1rem,4vw,1.8rem)] font-bold text-black uppercase tracking-[0.05em] hover:text-[#FC3D03] transition-all duration-500 leading-none block hover:translate-x-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-auto pb-12 flex gap-5">
                  {[
                    { name: 'X', path: 'M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.746m2.464 -2.454l6.768 -6.8', viewbox: '0 0 24 24' },
                    { name: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12h-4z M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', viewbox: '0 0 24 24' },
                    { name: 'Instagram', path: 'M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4038 15.9059C10.5691 15.7723 9.79055 15.3798 9.17643 14.7822C8.56231 14.1846 8.14005 13.4116 7.9675 12.5714C7.79495 11.7311 7.88124 10.8601 8.21441 10.0768C8.54758 9.29348 9.11147 8.63661 9.8277 8.19504C10.5439 7.75348 11.3789 7.54897 12.22 7.6094C13.914 7.7303 15.269 9.0853 15.39 10.779C15.3976 10.978 15.4011 11.1774 15.4005 11.3768L16 11.37Z M17.5 6.5H17.51', viewbox: '0 0 24 24' },
                    { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', viewbox: '0 0 24 24' }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#FC3D03] hover:border-[#FC3D03] hover:text-white transition-all duration-500"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" height="14" 
                        viewBox={social.viewbox} 
                        fill="none" stroke="currentColor" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            </>
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
              className="absolute left-0 w-full px-[clamp(1.5rem,5vw,6rem)] top-full pt-4 hidden lg:block"
            >
              <div className="bg-white rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden min-h-[420px] w-full border border-gray-100 flex relative z-[99999]">
                
                {/* Left Sidebar: Text Navigation */}
                <div className="w-[300px] bg-white border-r border-gray-50 p-10 flex flex-col font-outfit">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-8 border-b border-gray-50 pb-4">
                    {t('megaMenu.title')}
                  </span>
                  <div className="flex flex-col gap-6 relative">
                    {megaMenuLinks.map((s, idx) => (
                      <Link 
                        key={idx}
                        href={`/servicios#${s.slug}` as any}
                        className="group flex items-center gap-3 text-[13px] uppercase tracking-[0.1em] font-bold text-[#111111] hover:text-[#FC3D03] transition-all duration-300"
                      >
                        <div className="w-0 group-hover:w-1.5 h-1.5 bg-[#FC3D03] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        {s.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Link href="/servicios" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#FC3D03] hover:text-black transition-all group">
                      {t('megaMenu.catalog')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>

                {/* Right Panel: Visual Grid */}
                <div className="flex-1 p-10 bg-[#F9FAFB]/30 font-outfit">
                  <div className="grid grid-cols-5 gap-5 h-full">
                    {[
                      { name: t('megaMenu.categories.aduana'), img: '/images/menu-aduana.png', slug: 'aduana' },
                      { name: t('megaMenu.categories.transporte'), img: '/images/menu-transporte.png', slug: 'transporte' },
                      { name: t('megaMenu.categories.carga'), img: '/images/menu-carga.png', slug: 'manejo-carga' },
                      { name: t('megaMenu.categories.equipos'), img: '/images/menu-heavylift.png', slug: 'equipos' },
                      { name: t('megaMenu.categories.almacen'), img: '/images/menu-warehouse.png', slug: 'almacen' }
                    ].map((s, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        key={idx}
                        className="group flex flex-col gap-4 font-outfit"
                      >
                        <Link 
                          href={`/servicios#${s.slug}` as any}
                          className="block"
                        >
                          <div className="aspect-square bg-white rounded-2xl overflow-hidden relative shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_-10px_rgba(252,61,3,0.15)] transition-all duration-500">
                            <img 
                              src={s.img} 
                              alt={s.name}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-3 left-0 w-full text-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <span className="text-[10px] text-white font-bold uppercase tracking-widest">{t('megaMenu.info')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 pl-1">
                            <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-[#111111] group-hover:text-[#FC3D03] transition-colors duration-300 leading-tight">
                              {s.name}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
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
