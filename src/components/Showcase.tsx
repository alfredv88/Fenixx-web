"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

const makeContainer = (delay = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: delay },
  },
});

const letterVariants = {
  hidden: { y: 100, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function MonumentalWord({ word, fontSize, delay, className = '' }: {
  word: string;
  fontSize: string;
  delay: number;
  className?: string;
}) {
  const letters = word.split("");
  
  return (
    <motion.div
      className={`flex leading-none justify-center ${className}`}
      variants={makeContainer(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ fontSize }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="font-black text-white inline-block tracking-tight md:tracking-wider"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Showcase() {
  const t = useTranslations('Showcase');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax más profundo: empieza mucho más abajo (1500) y termina en -400
  const rawY = useTransform(scrollYProgress, [0, 1], [1500, -400]);
  const parallaxY = useSpring(rawY, { stiffness: 50, damping: 25, restDelta: 0.001 });



  const aduanaWord = t('words.aduana');
  const transporteWord = t('words.transporte');
  const logisticaWord = t('words.logistica');
  const cargaWord = t('words.carga');

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-48 bg-[#ebebeb] relative -mt-[1px]">
      
      <div className="w-full max-w-[1320px] mx-auto px-6 relative">
        
        {/* Monumental Words Stack */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end select-none pointer-events-none z-[1]">
          <motion.div style={{ y: parallaxY }} className="w-full flex flex-col items-center gap-0">

            <MonumentalWord word={aduanaWord}     fontSize="clamp(45px, 12vw, 19vw)" delay={0.1} />
            <MonumentalWord word={transporteWord} fontSize="clamp(24px, 7vw, 10vw)"  delay={0.35} />
            <MonumentalWord word={logisticaWord}  fontSize="clamp(22px, 5.5vw, 7vw)" delay={0.55} />
            <MonumentalWord word={cargaWord}      fontSize="clamp(18px, 4vw, 5vw)"   delay={0.75} />

          </motion.div>
        </div>

        <div className="flex flex-col items-center text-center relative z-[2]">
          
          {/* Container Hero Image */}
          <div className="w-full max-w-[1000px] aspect-[16/9] relative transform hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <Image 
              src="/images/showcase-main.webp" 
              alt="Cargo Solutions" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.15)] grayscale-[0.4] contrast-125 brightness-110"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
