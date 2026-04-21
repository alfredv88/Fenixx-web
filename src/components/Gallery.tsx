import React from 'react';

const projects = [
  {
    image: "/images/case-shanghai.png",
    category: "Carga Internacional",
    title: "Importación Shanghái → Caucédo",
  },
  {
    image: "/images/case-aduana.png",
    category: "Gestión Aduanal",
    title: "Despacho Express 24h",
  },
  {
    image: "/images/case-transporte.png",
    category: "Transporte Terrestre",
    title: "Distribución Nacional Multiparada",
  },
  {
    image: "/images/case-maquinaria.png",
    category: "Carga Proyecto",
    title: "Traslado de Maquinaria Pesada",
  }
];

export default function Gallery() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-white relative border-t border-black/5" id="portafolio">
      <div className="w-full max-w-[1400px] mx-auto px-6 xl:px-8">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-start">
          
          {/* Izquierda: Textos + Sticky */}
          <div className="xl:col-span-4 xl:sticky xl:top-32">
             <span className="text-[12px] uppercase tracking-[0.25em] text-[#FC3D03] font-bold block mb-4">
                Portafolio
             </span>
             <h2 className="text-[40px] xl:text-[48px] font-bold text-fenix-dark-graphite leading-[1.05] tracking-tight mb-6">
                Operaciones <br className="hidden xl:block"/>de alto impacto
             </h2>
             <p className="text-gray-500 text-[16px] leading-[1.7] mb-10 max-w-[340px]">
                Nuestra capacidad operativa comprobada en el terreno. Diseñamos soluciones logísticas reales para desafíos comerciales de alta complejidad técnica.
             </p>
             
             <div className="flex items-center gap-4">
               <a href="#contacto" className="group inline-flex items-center justify-center w-14 h-14 rounded-full bg-black text-white hover:bg-[#FC3D03] transition-colors duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </a>
               <span className="text-[13px] font-bold text-fenix-dark-graphite uppercase tracking-[0.15em]">Ver Casos Completos</span>
             </div>
          </div>

          {/* Derecha: Offset Grid de Imágenes */}
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Columna 1 */}
              <div className="flex flex-col gap-12">
                {[projects[0], projects[2]].map((p, i) => (
                   <a key={`col1-${i}`} href="#" className="group block">
                      <div className="relative overflow-hidden rounded-[16px] bg-gray-100 aspect-[4/5] mb-5">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                        {/* Hover overlay sutil */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <span className="text-[#FC3D03] text-[11px] uppercase tracking-[0.2em] font-bold block mb-2 transition-transform duration-500 group-hover:translate-x-2">
                           {p.category}
                        </span>
                        <h3 className="text-fenix-dark-graphite text-[20px] xl:text-[22px] font-bold leading-tight transition-all duration-500 group-hover:text-[#FC3D03] group-hover:translate-x-2">
                           {p.title}
                        </h3>
                      </div>
                   </a>
                ))}
              </div>

              {/* Columna 2 (Offset / Movida hacia abajo en Desktop) */}
              <div className="flex flex-col gap-12 md:pt-[100px]">
                {[projects[1], projects[3]].map((p, i) => (
                   <a key={`col2-${i}`} href="#" className="group block">
                      <div className="relative overflow-hidden rounded-[16px] bg-gray-100 aspect-[4/5] mb-5">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <span className="text-[#FC3D03] text-[11px] uppercase tracking-[0.2em] font-bold block mb-2 transition-transform duration-500 group-hover:translate-x-2">
                           {p.category}
                        </span>
                        <h3 className="text-fenix-dark-graphite text-[20px] xl:text-[22px] font-bold leading-tight transition-all duration-500 group-hover:text-[#FC3D03] group-hover:translate-x-2">
                           {p.title}
                        </h3>
                      </div>
                   </a>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
