import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import "./globals.css";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    es: "Fenixx Import Export | Logística y Gestión Aduanera Integral",
    en: "Fenixx Import Export | Integral Logistics & Customs Management",
    ar: "فينيكس للاستيراد والتصدير | الخدمات اللوجستية المتكاملة وإدارة الجمارك",
    fr: "Fenixx Import Export | Logistique Intégrale et Gestion Douanière"
  };

  const descriptions: Record<string, string> = {
    es: "Fenixx Import Export C.A - Centro Intermodal y Operador Logístico Integral en Venezuela. Expertos en transporte multimodal y carga especializada.",
    en: "Fenixx Import Export C.A - Intermodal Center and Integral Logistics Operator. Experts in multimodal transport and specialized cargo.",
    ar: "فينيكس للاستيراد والتصدير - مركز متعدد الوسائط ومشغل لوجستي متكامل. خبراء في النقل متعدد الوسائط والشحنات المتخصصة.",
    fr: "Fenixx Import Export C.A - Centre Intermodal et Opérateur Logistique Intégral. Experts en transport multimodal et fret spécialisé."
  };

  const keywords: Record<string, string> = {
    es: "logística, aduanas, transporte multimodal, carga pesada, fenixx, venezuela, puerto de guanta, gestión aduanera",
    en: "logistics, customs, multimodal transport, heavy cargo, fenixx, venezuela, port of guanta, customs management",
    ar: "الخدمات اللوجستية، الجمارك، النقل متعدد الوسائط، الشحنات الثقيلة، فينيكس، فنزويلا، ميناء غوانتا، إدارة الجمارك",
    fr: "logistique, douanes, transport multimodal, charge lourde, fenixx, venezuela, port de guanta, gestion douanière"
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es,
    keywords: keywords[locale] || keywords.es,
    openGraph: {
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
      images: [
        {
          url: '/images/industrial-monument.webp',
          width: 1200,
          height: 630,
          alt: 'Fenixx Import Export - Logistics Excellence'
        }
      ],
      locale: locale,
      type: 'website',
      siteName: 'Fenixx Import Export',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
      images: ['/images/industrial-monument.webp'],
    },
    alternates: {
      languages: {
        'es-VE': '/es',
        'en-US': '/en',
        'ar-SA': '/ar',
        'fr-FR': '/fr',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Google Fonts: Work Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={locale === 'ar' ? "font-['Cairo',sans-serif]" : "font-inter"}>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
