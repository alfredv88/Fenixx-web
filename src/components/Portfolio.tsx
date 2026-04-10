import React from 'react';

const projects = [
  {
    title: "International Sea Freight",
    category: "Multimodal Transport",
    image: "/images/service-transporte.png"
  },
  {
    title: "Express Customs Clearance",
    category: "Customs Management",
    image: "/images/service-aduanas.png"
  },
  {
    title: "Heavy Equipment Lifting",
    category: "Cargo Handling",
    image: "/images/service-carga.png"
  }
];

export default function Portfolio() {
  return (
    <section id="proyectos" className="py-[200px] bg-white font-['Work_Sans',sans-serif]">
      <div className="w-full max-w-[1320px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <span className="text-[14px] uppercase tracking-[0.2em] text-[#6e6e6e] font-bold block mb-6">
            Latest Projects
          </span>
          <h2 className="text-[56px] leading-[1.1] font-semibold text-gray-900 tracking-tight max-w-[700px]">
            Excellence in every logistics operation
          </h2>
        </div>

        {/* Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] mb-8">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <span className="text-[14px] uppercase tracking-[0.2em] text-[#6e6e6e] font-bold block mb-2">
                  {project.category}
                </span>
                <h3 className="text-[28px] font-semibold text-gray-900 group-hover:text-[#FC3D03] transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20">
          <a href="#proyectos" className="inline-flex items-center gap-4 text-[#FC3D03] font-bold text-[18px] group">
            Explore All Projects
            <div className="w-10 h-10 rounded-full border border-[#FC3D03] flex items-center justify-center group-hover:bg-[#FC3D03] group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
