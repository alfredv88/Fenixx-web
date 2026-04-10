import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Showcase from '../components/Showcase';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import Header from '../components/Header';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import Ticker from '../components/Ticker';

export default function Home() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
