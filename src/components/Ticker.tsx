"use client";
import React from 'react';
import { useTranslations } from 'next-intl';

export default function Ticker() {
  const t = useTranslations('Ticker');
  
  return (
    <>
      <div className="w-full bg-black py-4 lg:py-12 overflow-hidden select-none relative z-50 -mt-[1px]">
        <div className="flex flex-nowrap animate-ticker hover:[animation-play-state:paused] w-max">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-6 lg:gap-8 px-4 flex-shrink-0">
              <span className="text-[20px] lg:text-[45px] font-black text-fenix-white-soft uppercase tracking-tighter">{t('logistics')}</span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-fenix-red-light"></span>
              <span className="text-[20px] lg:text-[45px] font-black text-fenix-white-soft uppercase tracking-tighter">{t('transport')}</span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-fenix-red-light"></span>
              <span className="text-[20px] lg:text-[45px] font-black text-fenix-white-soft uppercase tracking-tighter">{t('cargo')}</span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-fenix-red-light"></span>
              <span className="text-[20px] lg:text-[45px] font-black text-fenix-white-soft uppercase tracking-tighter">{t('customs')}</span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-fenix-red-light"></span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 80s linear infinite;
        }
      `}} />
    </>
  );
}
