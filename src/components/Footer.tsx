import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fenix-black border-t border-white/5">
      <div className="w-full px-6 md:px-12 lg:px-24 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src="/images/logoS.png" 
              alt="Fenixx Logo" 
              className="h-20 w-auto object-contain mb-0" 
              style={{ filter: 'brightness(1.1) saturate(1.25)' }}
            />
            <p className="text-[#ebebeb]/70 text-[10px] uppercase tracking-widest mb-4 font-bold">
              IMPORT EXPORT C.A.
            </p>
            <p className="text-[#ebebeb]/70 text-sm leading-relaxed">
              El pulso de su carga, la fuerza de su éxito.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Servicios</a></li>
              <li><a href="#nosotros" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Quiénes Somos</a></li>
              <li><a href="#proyectos" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Portafolio</a></li>
              <li><a href="#contacto" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Servicios</h5>
            <ul className="space-y-3">
              <li><a href="/servicios/transporte" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Transporte Multimodal</a></li>
              <li><a href="/servicios/aduanas" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Gestión Aduanera</a></li>
              <li><a href="/servicios/carga" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Manejo de Carga</a></li>
              <li><a href="/servicios/equipos" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">Alquiler de Equipos</a></li>
            </ul>
          </div>

          {/* Contact Mini */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contacto</h5>
            <ul className="space-y-3">
              <li className="text-[#ebebeb]/70 text-sm leading-relaxed">
                Av. Raúl Leoni con Av. Real, Local S/N<br/>
                Urb. Industria de Guanta, Anzoátegui.
              </li>
              <li><a href="tel:+5804129671098" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">+58 0412 967 1098</a></li>
              <li><a href="mailto:info@fenixx.com" className="text-[#ebebeb]/70 text-sm hover:text-fenix-red-light transition-colors">info@fenixx.com</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#ebebeb]/70 text-xs">
            &copy; {currentYear} Fenixx Import Export C.A. Todos los derechos reservados.
          </p>
          <p className="text-[#ebebeb]/70 text-xs text-opacity-50">
            Diseñado por <a href="#" className="hover:text-fenix-red-light transition-colors">AMS Desarrollos</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
