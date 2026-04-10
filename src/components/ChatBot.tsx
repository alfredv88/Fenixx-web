"use client";
import React, { useEffect, useState } from 'react';

export default function ChatBot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="persistent-chat" 
      className={`group fixed bottom-10 left-10 z-[60] flex flex-col-reverse items-center gap-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Botón con gradiente corporativo (Naranja Claro a Naranja Oscuro) */}
      <button className="bg-gradient-to-br from-fenix-red-light to-fenix-red-dark p-4 rounded-full text-white shadow-xl hover:scale-110 transition-transform active:scale-95 shadow-fenix-red-dark/30 relative pointer-events-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg>
      </button>
      
      {/* Cápsula oculta por defecto, se revela al hacer hover en el contenedor */}
      <div className="bg-black/90 backdrop-blur-lg border border-[#808080]/30 px-5 py-2 rounded-full hidden sm:block shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none absolute bottom-[70px]">
          <span className="text-white font-bold text-sm tracking-wide">Asesoría: <span className="text-fenix-red-light">En línea</span></span>
      </div>
    </div>
  );
}
