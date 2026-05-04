"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Anchor, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fenix-red-light/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fenix-red-dark/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[120px] md:text-[180px] font-black text-white/5 leading-none block mb-4 select-none">
            {t('title')}
          </span>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fenix-red-light/10 border border-fenix-red-light/20 mb-8">
            <Anchor size={14} className="text-fenix-red-light" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fenix-red-light">
              System Error // 404
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit uppercase tracking-tight">
            {t('headline')}
          </h1>
          
          <p className="text-[#ebebeb]/60 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
            {t('description')}
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-3 bg-fenix-red-light hover:bg-fenix-red-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(252,61,3,0.3)] group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t('cta')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Industrial Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
