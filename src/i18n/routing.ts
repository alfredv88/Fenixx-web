import { createNavigation } from 'next-intl/navigation';

export const routing = {
  // A list of all locales that are supported
  locales: ['es', 'en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'es',
  
  // Optional: Define custom pathnames if we want translated URLs later
  pathnames: {
    '/': '/',
    '/nosotros': {
      es: '/nosotros',
      en: '/about',
      ar: '/about'
    },
    '/servicios': {
      es: '/servicios',
      en: '/services',
      ar: '/services'
    },
    '/portafolio': {
      es: '/portafolio',
      en: '/portfolio',
      ar: '/portfolio'
    }
  }
} as const;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
