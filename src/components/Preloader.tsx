"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Smooth logarithmic-like progress simulation
      const increment = Math.random() * (currentProgress > 80 ? 2 : 12);
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setComplete(true);
        setTimeout(() => setLoading(false), 800);
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const panelVariants: Variants = {
    initial: { y: 0 },
    exit: (i: number) => ({
      y: '-100%',
      transition: { 
        duration: 0.8, 
        ease: [0.19, 1, 0.22, 1] as const, 
        delay: i * 0.05 
      }
    })
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center bg-black"
        >
          {/* Cinematic Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay z-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[100vw] h-[100vh]">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>

          {/* Staggered Exit Panels */}
          <div className="absolute inset-0 flex overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={panelVariants}
                initial="initial"
                exit="exit"
                className="h-full flex-1 bg-[#0a0a0a] border-r border-white/[0.03]"
              />
            ))}
          </div>

          {/* Content Layer */}
          <div className="relative z-20 flex flex-col items-center px-6" dir="ltr">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                filter: complete ? "drop-shadow(0 0 25px rgba(252,61,3,0.4))" : "none"
              }}
              className="relative mb-20"
            >
              <div className="relative flex flex-col items-center">
                <h1 className="text-5xl md:text-[8rem] font-black tracking-[0.25em] uppercase flex items-center leading-none select-none">
                  <span className="text-white/10 relative">
                    FENI
                    <motion.span 
                      className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                      style={{ width: `${progress}%` }}
                    >
                      FENI
                    </motion.span>
                  </span>
                  <span className="text-[#FC3D03]/10 relative">
                    XX
                    <motion.span 
                      className="absolute inset-0 text-[#FC3D03] overflow-hidden whitespace-nowrap"
                      style={{ width: `${progress}%` }}
                    >
                      XX
                    </motion.span>
                  </span>
                </h1>
                
                {/* Technical Progress UI */}
                <div className="w-full mt-6 flex items-center gap-6">
                  <div className="h-[1px] flex-1 bg-white/5 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FC3D03] to-transparent opacity-50"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-[#FC3D03]"
                      style={{ originX: 0, scaleX: progress / 100 }}
                    />
                  </div>
                  <span className="font-mono text-[12px] text-[#FC3D03] tabular-nums tracking-widest min-w-[50px] text-right">
                    {Math.round(progress)}%
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
              </div>
            </motion.div>

            {/* Logistics Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-16 flex flex-col items-center"
            >
              <div className="flex gap-10 mb-6 h-4 items-center">
                {['AIR', 'SEA', 'LAND'].map((mode, i) => {
                  const isActive = progress > (i + 1) * 25;
                  return (
                    <div key={mode} className="flex flex-col items-center gap-2">
                       <span className={`text-[10px] tracking-[0.4em] font-black transition-all duration-700 ${isActive ? 'text-[#FC3D03] opacity-100 scale-110' : 'text-white/10 opacity-50 scale-100'}`}>
                        {mode}
                      </span>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        className="w-full h-[1px] bg-[#FC3D03]"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="relative overflow-hidden pt-2">
                <p className="text-[10px] uppercase tracking-[0.8em] text-white/30 font-bold whitespace-nowrap">
                  Logistics forged in precision
                </p>
                <motion.div 
                  className="absolute inset-0 bg-[#111]"
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20" />
          <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/20" />
          <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/20" />
          <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
