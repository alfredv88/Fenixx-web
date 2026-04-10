"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LETTERS = ['A', 'D', 'U', 'A', 'N', 'A'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    y: 140,
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // X4 parallax: empieza muy bajo el contenedor, sube agresivamente al scrollear
  const parallaxY = useTransform(scrollYProgress, [0, 1], [1200, -600]);

  return (
    <section ref={sectionRef} className="py-[200px] bg-[#ebebeb] relative overflow-hidden">
      
      <div className="w-full max-w-[1320px] mx-auto px-6 relative">
        
        {/* Monumental Staggered + Parallax Background Text */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center select-none pointer-events-none z-0">
          <motion.div
            style={{ y: parallaxY, fontSize: '19vw' }}
            className="flex leading-none"
          >
            <motion.div
              className="flex leading-none"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="font-bold text-white tracking-widest opacity-90 inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Container Hero Image */}
          <div className="w-full max-w-[1000px] transform hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <img 
              src="/images/Generated Image April 08, 2026 - 5_12PM.png" 
              alt="Cargo Solutions" 
              className="w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.15)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
