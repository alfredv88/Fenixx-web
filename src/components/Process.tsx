import React from 'react';

const steps = [
  {
    step: "PASO 1",
    title: "Gestión aduanal sin fricciones",
    subtitle: "Procesamos tus importaciones y exportaciones con agilidad.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FC3D03" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h2l2 4 2-4h2"/></svg>`
  },
  {
    step: "PASO 2",
    title: "Transporte puerta a puerta",
    subtitle: "Movemos tu carga de origen a destino con socios confiables.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FC3D03" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
  },
  {
    step: "PASO 3",
    title: "Soluciones logísticas a la medida",
    subtitle: "Diseñamos estrategias personalizadas para tu cadena de suministro.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FC3D03" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
  }
];

export default function Process() {
  return (
    <section className="bg-[#ebebeb] py-[100px]">
      <div className="w-full max-w-[1300px] mx-auto px-8 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* LEFT: Sticky */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 pt-4">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#FC3D03] font-bold block mb-6">
              Promesa de Valor
            </span>
            <h2 className="text-[44px] xl:text-[52px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              El pulso de su carga, la fuerza de su éxito
            </h2>
            <p className="text-gray-900 text-[16px] leading-[1.75] mb-10 max-w-[380px]">
              Conectamos fronteras y simplificamos destinos mediante una gestión integral que garantiza seguridad, velocidad y eficiencia en cada movimiento.
            </p>
            <a href="#contacto"
               className="inline-flex items-center justify-center gap-2 bg-[#FC3D03] hover:bg-[#e03502] text-white
                      px-8 py-4 rounded-full font-semibold text-[15px] transition-all duration-300
                      hover:shadow-lg hover:shadow-orange-500/25">
              Hablar con un Asesor
            </a>
          </div>

          {/* RIGHT: Stacking cards */}
          <div className="lg:w-7/12 flex flex-col">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-10 xl:p-12 border border-[#eaeaea]
                       lg:sticky shadow-sm"
                style={{ top: `${80 + i * 24}px`, zIndex: 10 + i }}
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#FC3D03] font-bold block mb-5">
                  {s.step}
                </span>
                <h3 className="text-[24px] font-bold text-gray-900 leading-snug mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-900 text-[13px] font-medium mb-8">{s.subtitle}</p>
                <div dangerouslySetInnerHTML={{ __html: s.icon }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
