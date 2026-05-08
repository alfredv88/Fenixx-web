import { createNavigation } from 'next-intl/navigation';

export const routing = {
  // A list of all locales that are supported
  locales: ['es', 'en', 'tr', 'fr'],

  // Used when no locale matches
  defaultLocale: 'es',
  
  // Optional: Define custom pathnames if we want translated URLs later
  pathnames: {
    '/': '/',
    '/nosotros': {
      es: '/nosotros',
      en: '/about',
      tr: '/hakkimizda',
      fr: '/nos-valeurs'
    },
    '/servicios': {
      es: '/servicios',
      en: '/services',
      tr: '/hizmetler',
      fr: '/nos-services'
    },
    '/portafolio': {
      es: '/portafolio',
      en: '/portfolio',
      tr: '/portfoy',
      fr: '/notre-portfolio'
    }
  }
} as const;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
