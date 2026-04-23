"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fenix-black border-t border-white/5 relative overflow-hidden">
      {/* Background Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* Monumental Background Text (Outline) */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 hidden lg:block w-full text-center">
        <span 
          className="text-[220px] font-black text-transparent opacity-10"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
        >
          FENIXX
        </span>
      </div>

      {/* Shimmer Line Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none">
        <div className="footer-shimmer-glow" />
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-6 md:px-12 lg:px-24 py-16 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <img 
              src="/images/logoS.png" 
              alt="Fenixx Logo" 
              className="h-24 w-auto object-contain mb-2" 
              style={{ filter: 'brightness(1.1) saturate(1.25)' }}
            />
            <p className="text-[#ebebeb]/70 text-[10px] uppercase tracking-widest mb-1 font-bold">
              IMPORT EXPORT C.A.
            </p>
            <p className="text-[#ebebeb]/70 text-sm leading-relaxed max-w-[250px] font-medium italic opacity-80">
              {t('brand.slogan')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:justify-self-center">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{t('sections.navigation')}</h5>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.home')}</Link></li>
              <li><Link href="/servicios" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.services')}</Link></li>
              <li><Link href="/nosotros" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.about')}</Link></li>
              <li><Link href="/portafolio" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.portfolio')}</Link></li>
              <li><Link href={"/#contacto" as any} className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:justify-self-center">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{t('sections.services')}</h5>
            <ul className="space-y-3">
              <li><Link href={"/servicios#transporte" as any} className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.services_list.transporte')}</Link></li>
              <li><Link href={"/servicios#aduana" as any} className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.services_list.aduana')}</Link></li>
              <li><Link href={"/servicios#manejo-carga" as any} className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.services_list.carga')}</Link></li>
              <li><Link href={"/servicios#equipos" as any} className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">{t('links.services_list.equipos')}</Link></li>
            </ul>
          </div>

          {/* Contact Mini */}
          <div className="lg:justify-self-end">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-6">{t('sections.contact')}</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-[#ebebeb]/70 text-sm leading-relaxed max-w-[280px] group">
                <div className="mt-1 p-1.5 rounded bg-white/5 group-hover:bg-fenix-red-light/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fenix-red-light"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span>
                  {t('contact.address')}
                </span>
              </li>
              <li className="flex items-center gap-4 text-[#ebebeb]/70 text-sm group">
                <div className="p-1.5 rounded bg-white/5 group-hover:bg-fenix-red-light/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fenix-red-light"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <a href="tel:+5804129671098" className="hover:text-fenix-red-light transition-colors">+58 0412 967 1098</a>
              </li>
              <li className="flex items-center gap-4 text-[#ebebeb]/70 text-sm group">
                <div className="p-1.5 rounded bg-white/5 group-hover:bg-fenix-red-light/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fenix-red-light"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <a href="mailto:info@fenixx.com" className="hover:text-fenix-red-light transition-colors">info@fenixx.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[#ebebeb]/70 text-xs font-medium">
              &copy; {currentYear} Fenixx Import Export C.A. {t('bottom.rights')}
            </p>
            <p className="text-[#ebebeb]/30 text-[10px] uppercase tracking-[0.2em]">
              {t('bottom.tagline')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {[ 
              { icon: 'x', href: '#' },
              { icon: 'linkedin', href: '#' },
              { icon: 'instagram', href: '#' },
              { icon: 'facebook', href: '#' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#ebebeb]/50 hover:bg-fenix-red-light hover:text-white transition-all duration-300 group"
              >
                {social.icon === 'x' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.746m2.464 -2.454l6.768 -6.8"/></svg>}
                {social.icon === 'linkedin' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>}
                {social.icon === 'instagram' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>}
                {social.icon === 'facebook' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>}
              </a>
            ))}
          </div>

          <p className="text-[#ebebeb]/40 text-[11px]">
            {t('bottom.designed_by')} <a href="#" className="text-[#ebebeb]/60 hover:text-fenix-red-light transition-colors font-semibold">AMS Desarrollos</a>
          </p>
        </div>

        {/* Shimmer Style */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes footer-shimmer-move {
            0%   { transform: translateX(-40%); opacity: 0; }
            10%  { opacity: 1; }
            50%  { transform: translateX(60%); opacity: 0.7; }
            90%  { opacity: 1; }
            100% { transform: translateX(160%); opacity: 0; }
          }
          .footer-shimmer-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 35%;
            height: 1px;
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(252, 61, 3, 0.15) 20%,
              rgba(252, 61, 3, 0.65) 50%,
              rgba(252, 61, 3, 0.15) 80%,
              transparent 100%
            );
            box-shadow: 0 0 10px 2px rgba(252, 61, 3, 0.25), 0 0 25px 4px rgba(252, 61, 3, 0.1);
            animation: footer-shimmer-move 4s ease-in-out infinite;
          }
        `}} />
      </div>
    </footer>
  );
}
