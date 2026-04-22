import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Showcase from '@/components/Showcase';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Ticker from '@/components/Ticker';
import ChatBot from '@/components/ChatBot';

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
        <Partners />
        <Process />
        <Gallery />
        <Contact />
      </main>
      <ChatBot />
    </>
  );
}
