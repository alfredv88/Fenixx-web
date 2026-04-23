import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';
import "./globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fenixx Import Export",
  description: "Fenixx Import Export C.A - Centro Intermodal y Operador Logístico Integral. Expertos en gestión aduanera, transporte multimodal y logística de carga especializada.",
  keywords: "logistica, aduanas, transporte multimodal, fenixx import, centro intermodal, carga especializada, importacion exportacion",
};

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
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={locale === 'ar' ? "font-['Cairo',sans-serif]" : "font-['Work_Sans',sans-serif]"}>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
