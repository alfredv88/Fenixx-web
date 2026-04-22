"use client";
import React from 'react';
import { useTranslations } from 'next-intl';

const partners = [
  {
    name: "FedEx",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:28px;font-weight:900;letter-spacing:-1px;">Fed<span style="font-style:italic;">Ex</span></span>`
  },
  {
    name: "DHL",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:32px;font-weight:900;letter-spacing:2px;">DHL</span>`
  },
  {
    name: "Maersk",
    label: `<span style="font-family:Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:4px;">MAERSK</span>`
  },
  {
    name: "UPS",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:30px;font-weight:900;letter-spacing:2px;">UPS</span>`
  },
  {
    name: "MSC",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:30px;font-weight:900;letter-spacing:2px;">MSC</span>`
  },
  {
    name: "DB Schenker",
    label: `<span style="font-family:Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:3px;line-height:1.3;text-align:center;display:block;">DB<br>SCHENKER</span>`
  },
];

export default function Partners() {
  const t = useTranslations('Partners');

  return (
    <section className="py-12 md:py-24 bg-black">
      <div className="w-full max-w-[1300px] mx-auto px-8 xl:px-16">

        {/* Label */}
        <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#ebebeb]/70 font-bold mb-8 md:mb-12">
          {t('label')}
        </p>

        {/* Partners pill container */}
        <div className="border border-white/10 rounded-[20px] md:rounded-[30px] overflow-hidden flex flex-col md:flex-row bg-white/[0.02]">
          {partners.map((p, i) => (
            <div 
              key={i}
              className={`flex-1 flex items-center justify-center py-8 md:py-16 px-6
              text-[#ebebeb]/70 hover:text-[#ebebeb] transition-all duration-500 cursor-default group
              ${i < partners.length - 1 ? 'md:border-r border-b md:border-b-0 border-white/10' : ''}
            `}>
              <span className="sr-only">{p.name}</span>
              <div className="transition-transform duration-500 group-hover:scale-110">
                <span dangerouslySetInnerHTML={{ __html: p.label }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
