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


          {/* Staggered Exit Panels */}
          <div className="absolute inset-0 flex overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={panelVariants}
                initial="initial"
                exit="exit"
                className="h-full flex-1 bg-[#0a0a0a]"
              />
            ))}
          </div>

          {/* Content Layer (Fixed Structure) */}
          <div className="relative z-20 w-full h-full flex flex-col items-center justify-between py-24 md:py-32 px-6" dir="ltr">
            
            {/* Top Corner Decor - Optional but for balance */}
            <div className="opacity-0 h-4 md:h-10" />

            {/* Middle Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                filter: complete ? "drop-shadow(0 0 25px var(--color-fenix-red-light))" : "none"
              }}
              className="flex flex-col items-center justify-center flex-1 w-full"
            >
              <div className="relative flex flex-col items-center">
                <h1 className="text-5xl md:text-[8rem] font-black tracking-[0.15em] md:tracking-[0.25em] uppercase flex items-center leading-none select-none">
                  <span className="text-white/10 relative">
                    FENI
                    <motion.span 
                      className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                      style={{ width: `${progress}%` }}
                    >
                      FENI
                    </motion.span>
                  </span>
                  <span className="text-[var(--color-fenix-red-light)]/10 relative">
                    XX
                    <motion.span 
                      className="absolute inset-0 text-[var(--color-fenix-red-light)] overflow-hidden whitespace-nowrap"
                      style={{ width: `${progress}%` }}
                    >
                      XX
                    </motion.span>
                  </span>
                </h1>
                
                {/* Technical Progress UI */}
                <div className="w-[80vw] max-w-[400px] mt-8 flex items-center gap-6">
                  <div className="h-[1px] flex-1 bg-white/5 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-fenix-red-light)] to-transparent opacity-50"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-[var(--color-fenix-red-light)]"
                      style={{ originX: 0, scaleX: progress / 100 }}
                    />
                  </div>
                  <span className="font-mono text-[12px] text-[var(--color-fenix-red-light)] tabular-nums tracking-widest min-w-[50px] text-right">
                    {Math.round(progress)}%
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
              </div>
            </motion.div>

            {/* Bottom Indicators Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-10 mt-auto"
            >
              <div className="flex gap-8 md:gap-12 h-4 items-center">
                {['AIR', 'SEA', 'LAND'].map((mode, i) => {
                  const isActive = progress > (i + 1) * 25;
                  return (
                    <div key={mode} className="flex flex-col items-center gap-2">
                       <span className={`text-[10px] tracking-[0.4em] font-black transition-all duration-700 ${isActive ? 'text-[var(--color-fenix-red-light)] opacity-100 scale-110' : 'text-white/10 opacity-50 scale-100'}`}>
                        {mode}
                      </span>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        className="w-full h-[1.5px] bg-[var(--color-fenix-red-light)]"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="relative overflow-hidden pt-2 px-4">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] md:tracking-[0.8em] text-white/40 font-bold whitespace-nowrap">
                  Logistics forged in precision
                </p>
                <motion.div 
                  className="absolute inset-0 bg-[#0a0a0a]"
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
              </div>
            </motion.div>
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
