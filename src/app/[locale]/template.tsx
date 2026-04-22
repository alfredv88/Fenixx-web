"use client";
import { motion } from "framer-motion";

/**
 * Template component that wraps all pages within the [locale] group.
 * Next.js Templates re-mount on every navigation, allowing us to 
 * trigger entry animations and mechanical transitions consistently.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* 
        MECHANICAL SHUTTER
        This layer covers the screen and slides UP to reveal the page
        on every navigation, giving a heavy, industrial feeling.
      */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.83, 0, 0.17, 1],
          delay: 0.1
        }}
        style={{ originY: 0 }}
        className="fixed inset-0 bg-[#0a0a0a] z-[100000] pointer-events-none flex items-center justify-center"
      >
        {/* Cinematic Shutter Edge (Glow Line) */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#FC3D03] shadow-[0_0_40px_rgba(252,61,3,0.6)]" />
        
        {/* Subtle Industrial Watermark during transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.8 }}
          className="text-white/5 font-bold text-[10vw] uppercase tracking-[0.5em] pointer-events-none select-none"
        >
          Fenixx
        </motion.div>
      </motion.div>

      {/* Main Content Reveal Animation */}
      <motion.div
        initial={{ y: 20, filter: "blur(5px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 1.4, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
