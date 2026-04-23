"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + (Math.random() * 15);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[99999] bg-[#111111] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Industrial Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="relative flex flex-col items-center">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mb-12"
            >
              {/* Central Logo Text */}
              <div className="relative">
                <div className="text-6xl md:text-8xl font-black tracking-[0.2em] uppercase flex">
                  <span className="text-white/10">FENI</span>
                  <span className="text-white/10">XX</span>
                </div>
                
                {/* Progress Fill Layer */}
                <motion.div 
                  className="absolute top-0 left-0 overflow-hidden whitespace-nowrap select-none flex"
                  style={{ width: `${progress}%` }}
                >
                  <div className="text-6xl md:text-8xl font-black tracking-[0.2em] uppercase flex">
                    <span className="text-[#808080]">FENI</span>
                    <span className="text-[#FC3D03]">XX</span>
                  </div>
                </motion.div>
              </div>

              {/* Glowing Pulse Effect under the logo */}
              <motion.div 
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#FC3D03] blur-[60px] rounded-full z-[-1]"
              />
            </motion.div>

            {/* Industrial Progress Bar */}
            <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#FC3D03] shadow-[0_0_15px_rgba(252,61,3,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              />
            </div>
            
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">
                Logistics forged in precision
              </span>
              <span className="text-[12px] font-mono text-[#FC3D03] opacity-80 mt-2">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <style jsx global>{`
            .stroke-text {
              -webkit-text-stroke: 1px rgba(255,255,255,0.1);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
