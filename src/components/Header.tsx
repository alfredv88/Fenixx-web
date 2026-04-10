"use client";
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <header
        id="main-header"
        className={`top-0 left-0 w-full z-50 transition-all duration-500 py-2 ${
          isScrolled ? 'is-scrolled fixed bg-white py-1 shadow-md animate-[slide-down_0.4s_ease-out_forwards]' : 'absolute bg-transparent'
        }`}
      >
        <nav className="w-full px-6 md:px-12 lg:px-24 flex justify-between items-center transition-all duration-500">
          <div className="flex items-center gap-2">
            <img
              src="/images/logoS.png"
              alt="Fenixx Logo"
              className={`w-auto object-contain transition-all duration-500 logo-img ${isScrolled ? 'h-20' : 'h-32'}`}
            />
          </div>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <div className="flex items-center gap-6 mr-4">
              {['Inicio', 'Servicios', 'Portafolio', 'Contáctanos'].map((text, i) => (
                <a
                  key={i}
                  href={`#${text.toLowerCase().replace('á', 'a')}`}
                  className={`nav-link font-bold text-[14px] transition-colors hover:text-[#FC3D03] ${
                    isScrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  {text}
                </a>
              ))}
            </div>
            <div className={`flex items-center gap-4 py-2 border-l pl-6 social-links ${isScrolled ? 'border-black/10' : 'border-white/20'}`}>
              <a href="#" className={`nav-link transition-colors hover:text-fenix-red-light ${isScrolled ? 'text-black' : 'text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.746m2.464 -2.454l6.768 -6.8"/></svg>
              </a>
              <a href="#" className={`nav-link transition-colors hover:text-fenix-red-light ${isScrolled ? 'text-black' : 'text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className={`nav-link transition-colors hover:text-fenix-red-light ${isScrolled ? 'text-black' : 'text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={`nav-link transition-colors hover:text-fenix-red-light ${isScrolled ? 'text-black' : 'text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden mobile-menu-btn ${isScrolled ? 'text-black' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>

        {/* Animated red shimmer line — solo visible en header scrolleado */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none">
            <div className="shimmer-glow" />
          </div>
        )}
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
          animation: shimmer-move 18s ease-in-out infinite;
        }
      `}} />
    </>
  );
}
