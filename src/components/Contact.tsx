import React from 'react';

export default function Contact() {
  return (
    <section id="contacto" className="py-[100px] lg:py-[160px] bg-white border-t border-gray-200">
      <div className="w-full max-w-[1400px] mx-auto px-6 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Info Izquierda */}
          <div className="lg:col-span-5">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#FC3D03] font-bold block mb-4">
              Contacto
            </span>
            <h2 className="text-[40px] xl:text-[56px] font-bold text-gray-900 leading-[1.05] tracking-tight mb-8">
              Iniciemos su <br/>próxima operación.
            </h2>
            <p className="text-gray-500 text-[16px] xl:text-[18px] leading-[1.7] mb-12 max-w-[400px]">
              Fénixx Logistics está listo para optimizar su cadena de suministro. Nuestro equipo de expertos le responderá en menos de 24 horas.
            </p>
            
            <div className="flex flex-col gap-10">
              <div className="group">
                <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold block mb-2">Línea Directa</span>
                <a href="tel:+5804129671098" className="text-[20px] xl:text-[24px] font-medium text-gray-900 hover:text-[#FC3D03] transition-colors relative inline-flex items-center gap-2">
                  +58 0412 967 1098
                </a>
              </div>
              
              <div className="group">
                <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold block mb-2">Correo Corporativo</span>
                <a href="mailto:info@fenixx.com" className="text-[20px] xl:text-[24px] font-medium text-gray-900 hover:text-[#FC3D03] transition-colors relative inline-flex items-center gap-2">
                  info@fenixx.com
                </a>
              </div>

              <div className="mt-4">
                 <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold block mb-2">Oficinas Fénixx</span>
                 <p className="text-[15px] xl:text-[16px] text-gray-600 leading-relaxed max-w-[280px]">
                   Av. Francisco de Miranda, <br/>Torre Empresarial, Piso 8.<br/>Caracas, Venezuela.
                 </p>
              </div>
            </div>
          </div>

          {/* Formulario Derecha */}
          <div className="lg:col-span-7 lg:col-start-6">
            <form className="flex flex-col gap-10 lg:pt-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-4 text-[16px] xl:text-[18px] text-gray-900 focus:ring-0 focus:border-[#FC3D03] transition-colors" required />
                  <label htmlFor="name" className="absolute left-0 top-4 text-gray-400 text-[16px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#FC3D03] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:font-bold peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-400 -top-4 text-[11px] text-gray-900 uppercase tracking-[0.15em] font-bold cursor-text">
                    Nombre Completo
                  </label>
                </div>
                
                <div className="relative group">
                  <input type="email" id="email" placeholder=" " className="peer w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-4 text-[16px] xl:text-[18px] text-gray-900 focus:ring-0 focus:border-[#FC3D03] transition-colors" required />
                  <label htmlFor="email" className="absolute left-0 top-4 text-gray-400 text-[16px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#FC3D03] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:font-bold peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-400 -top-4 text-[11px] text-gray-900 uppercase tracking-[0.15em] font-bold cursor-text">
                    Correo Electrónico
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input type="text" id="company" placeholder=" " className="peer w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-4 text-[16px] xl:text-[18px] text-gray-900 focus:ring-0 focus:border-[#FC3D03] transition-colors" required />
                <label htmlFor="company" className="absolute left-0 top-4 text-gray-400 text-[16px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#FC3D03] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:font-bold peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-400 -top-4 text-[11px] text-gray-900 uppercase tracking-[0.15em] font-bold cursor-text">
                  Empresa / Organización
                </label>
              </div>

              <div className="relative group mt-4">
                <textarea id="message" rows={3} placeholder=" " className="peer w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-4 text-[16px] xl:text-[18px] text-gray-900 focus:ring-0 focus:border-[#FC3D03] transition-colors resize-none" required></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-gray-400 text-[16px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#FC3D03] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:font-bold peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-400 -top-4 text-[11px] text-gray-900 uppercase tracking-[0.15em] font-bold cursor-text">
                  Detalles de la Operación
                </label>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <button type="submit" className="bg-gray-900 hover:bg-[#FC3D03] text-white px-10 py-5 w-full sm:w-auto rounded-full font-bold text-[13px] xl:text-[14px] uppercase tracking-[0.15em] transition-colors duration-300 flex items-center justify-center gap-3 group/btn">
                  <span>Enviar Solicitud</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <p className="text-[12px] text-gray-400 max-w-[250px] leading-relaxed hidden sm:block">
                  Al enviar usted acepta nuestras normativas de privacidad y manejo de datos B2B.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
