"use client";
import React, { useEffect } from 'react';

const testimonials = [
  {
    name: "David Nguyen",
    role: "Director de Logística",
    quote: "El equipo dedicado de Fenixx mantiene nuestra carga en movimiento a tiempo y sin complicaciones. Sus soluciones rápidas han hecho de ellos nuestro socio más confiable.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Samantha Lee",
    role: "Operaciones Comerciales",
    quote: "El seguimiento en tiempo real nos permite planificar con anticipación y mantiene nuestro inventario al día. Confiamos en Fenixx para tener nuestras tiendas surtidas todo el año.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Megan Turner",
    role: "Líder de Cadena de Suministro",
    quote: "Desde la recolección hasta la entrega, el servicio de Fenixx es de primera. Sus transportistas siempre llegan a tiempo y nuestros bienes arriban seguros en cada envío.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Olivia Ward",
    role: "Gerente de Distribución",
    quote: "El equipo de almacenamiento de Fenixx es rápido y confiable. Tener un solo socio para manejar el almacenaje y el envío nos ahorra tiempo y dinero cada mes.",
    image: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    name: "Carlos Ruiz",
    role: "Gerente de Importaciones",
    quote: "Los trámites aduanales que maneja Fenixx se procesaron sin retrasos. Su equipo es profesional y siempre está disponible para resolver cualquier duda al instante.",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Laura Méndez",
    role: "Coordinadora de Suministros",
    quote: "Fenixx transformó nuestra cadena de suministro. Los tiempos de entrega mejoraron un 40% y los reportes en línea son exactos y súper claros para nuestro directorio.",
    image: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    name: "James Torres",
    role: "Broker de Carga",
    quote: "Trabajar con Fenixx no tiene fricciones. Su comunicación es excelente, los envíos se manejan con mucho cuidado y siempre entregan a tiempo sin excepciones.",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Patricia Solano",
    role: "Gerente de Operaciones",
    quote: "Desde que trabajamos con Fenixx, las importaciones llegan sin sorpresas. El equipo conoce cada detalle del proceso y eso se nota inmediatamente en los resultados.",
    image: "https://randomuser.me/api/portraits/women/60.jpg"
  }
];

export default function Testimonials() {

  useEffect(() => {
    var GAP     = 20;
    var VISIBLE = 4;
    var current = 0;

    var outer   = document.getElementById('t-outer');
    var track   = document.getElementById('t-track');
    var prev    = document.getElementById('t-prev');
    var next    = document.getElementById('t-next');
    var dots    = document.querySelectorAll('#t-dots .dot');
    var total   = dots.length;

    if (!track || !outer || !prev || !next) return;
    
    // Solo clonar si no se ha clonado (en react strict mode puede correr dos veces)
    if (track.children.length === total) {
      var origCards = Array.from(track.children);

      var clonesBefore = origCards.slice(-VISIBLE).map(function(c) {
        return c.cloneNode(true);
      });
      clonesBefore.reverse().forEach(function(c) {
        track.insertBefore(c, track.firstChild);
      });

      var clonesAfter = origCards.slice(0, VISIBLE).map(function(c) {
        return c.cloneNode(true);
      });
      clonesAfter.forEach(function(c) {
        track.appendChild(c);
      });
    }

    var allCards = track.querySelectorAll('.t-card');

    function getVisible() {
      var w = window.innerWidth;
      if (w >= 1024) return 4;
      if (w >= 640)  return 2;
      return 1;
    }

    function setCardWidths() {
      VISIBLE     = getVisible();
      var outerW  = outer?.offsetWidth || 0;
      var cardW   = (outerW - GAP * (VISIBLE - 1)) / VISIBLE;
      allCards.forEach(function(c: any) { c.style.width = cardW + 'px'; });
      if (track) track.style.gap = GAP + 'px';
      return cardW;
    }

    function moveTo(idx: number, animate: boolean) {
      var cardW   = setCardWidths();
      var realIdx = idx + VISIBLE; 
      var offset  = realIdx * (cardW + GAP);

      if (track) {
        track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
        track.style.transform  = 'translateX(-' + offset + 'px)';
      }
    }

    function updateDots() {
      var dotIdx = ((current % total) + total) % total;
      dots.forEach(function(d, i) {
        var active = i === dotIdx;
        d.classList.toggle('bg-[#FC3D03]', active);
        d.classList.toggle('w-5', active);
        d.classList.toggle('bg-gray-300', !active);
        d.classList.toggle('w-2', !active);
      });
    }

    function go(idx: number) {
      current = idx;
      moveTo(current, true);
      updateDots();
    }

    function onTransitionEnd() {
      if (current >= total) {
        current = current - total;
        moveTo(current, false);
      } else if (current < 0) {
        current = current + total;
        moveTo(current, false);
      }
      updateDots();
    }

    track.addEventListener('transitionend', onTransitionEnd);

    const onPrev = () => go(current - 1);
    const onNext = () => go(current + 1);

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    
    const dotHandlers: any[] = [];
    dots.forEach(function(d) {
      const h = () => go(parseInt(d.getAttribute('data-i') || '0'));
      dotHandlers.push(h);
      d.addEventListener('click', h);
    });
    
    const onResize = () => moveTo(current, false);
    window.addEventListener('resize', onResize);

    moveTo(current, false);
    updateDots();

    return () => {
      // Cleanup for hot reload
      track?.removeEventListener('transitionend', onTransitionEnd);
      prev?.removeEventListener('click', onPrev);
      next?.removeEventListener('click', onNext);
      dots.forEach((d, i) => d.removeEventListener('click', dotHandlers[i]));
      window.removeEventListener('resize', onResize);
      
      // Clean up clones on unmount
      if (track) {
        Array.from(track.children).forEach((c, i) => {
           if (i < VISIBLE || i >= VISIBLE + total) {
              track?.removeChild(c);
           }
        });
      }
    };
  }, []);

  return (
    <section className="py-32 md:py-48 lg:py-64 bg-[#ebebeb] overflow-hidden">
      <div className="w-full">

        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-2">
            <span className="text-[14px] uppercase tracking-[0.2em] text-[#FC3D03] font-bold block pt-2">
              NUESTROS CLIENTES
            </span>
          </div>
          <div className="md:col-start-6 md:col-span-6 lg:col-start-6 lg:col-span-5">
            <p className="text-gray-900 text-[15px] xl:text-[16px] leading-[1.7]">
              Fenixx entrega más que carga: nuestro equipo de especialistas brinda tranquilidad en cada movimiento. Lea lo que nuestros clientes opinan sobre nuestra dedicación y eficiencia.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative px-6 md:px-12 lg:px-24">
          <div id="t-outer" className="overflow-hidden w-full">
            <div id="t-track" className="flex">
              {testimonials.map((item, index) => (
                <div key={index} className="t-card flex-shrink-0 bg-white rounded-[20px] p-8 xl:p-10 flex flex-col hover:-translate-y-1 transition-[transform,box-shadow] duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fc9003">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-900 text-[15px] leading-[1.7] mb-8 flex-grow">{item.quote}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={item.image} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="text-[14px] font-bold text-gray-900 leading-tight">{item.name}</p>
                      <p className="text-[12px] text-[#FC3D03]">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button id="t-prev" aria-label="Anterior"
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition z-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button id="t-next" aria-label="Siguiente"
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition z-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div id="t-dots" className="flex justify-center gap-2.5 mt-10">
          {testimonials.map((_, i) => (
            <button key={i} data-i={String(i)}
              className={`dot rounded-full transition-all duration-300 h-2 ${i === 0 ? 'bg-[#FC3D03] w-5' : 'bg-gray-300 w-2'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
