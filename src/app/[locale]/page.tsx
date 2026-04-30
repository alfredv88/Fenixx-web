import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Showcase from '@/components/Showcase';
import TrustVideo from '@/components/TrustVideo';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Ticker from '@/components/Ticker';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    es: "Fenixx | Centro Intermodal y Logística Integral en Venezuela",
    en: "Fenixx | Intermodal Center and Integral Logistics in Venezuela",
    ar: "فينيكس | المركز متعدد الوسائط والخدمات اللوجستية المتكاملة في فنزويلا",
    fr: "Fenixx | Centre Intermodal et Logistique Intégrale au Venezuela"
  };

  return {
    title: titles[locale] || titles.es,
  };
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Showcase />
        <Testimonials />
        <TrustVideo />
        <Partners />
        <Process />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
