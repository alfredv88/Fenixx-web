"use client";
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function Ticker() {
  const t = useTranslations('Ticker');

  
  return (
    <>
      <div className="w-full bg-black py-4 lg:py-10 overflow-hidden select-none relative z-50 border-b border-white/[0.03]">
        <div className="flex flex-nowrap animate-ticker hover:[animation-play-state:paused] w-max items-center">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-10 lg:gap-14 px-5 flex-shrink-0">
              <span className="text-[22px] lg:text-[48px] font-black text-fenix-white-soft uppercase tracking-tighter font-outfit">{t('logistics')}</span>
              <div className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-[var(--color-fenix-red-light)] shadow-[0_0_12px_var(--color-fenix-red-light)]" />
              <span className="text-[22px] lg:text-[48px] font-black text-fenix-white-soft uppercase tracking-tighter font-outfit">{t('transport')}</span>
              <div className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-[var(--color-fenix-red-light)] shadow-[0_0_12px_var(--color-fenix-red-light)]" />
              <span className="text-[22px] lg:text-[48px] font-black text-fenix-white-soft uppercase tracking-tighter font-outfit">{t('cargo')}</span>
              <div className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-[var(--color-fenix-red-light)] shadow-[0_0_12px_var(--color-fenix-red-light)]" />
              <span className="text-[22px] lg:text-[48px] font-black text-fenix-white-soft uppercase tracking-tighter font-outfit">{t('customs')}</span>
              <div className="w-2 h-2 lg:w-3 lg:h-3 flex-shrink-0 rounded-full bg-[var(--color-fenix-red-light)] shadow-[0_0_12px_var(--color-fenix-red-light)]" />
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
