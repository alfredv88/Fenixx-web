import React from 'react';

const partners = [
  {
    name: "FedEx",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:28px;font-weight:900;letter-spacing:-1px;">Fed<span style="font-style:italic;">Ex</span></span>`
  },
  {
    name: "DHL",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:32px;font-weight:900;letter-spacing:2px;">DHL</span>`
  },
  {
    name: "Maersk",
    label: `<span style="font-family:Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:4px;">MAERSK</span>`
  },
  {
    name: "UPS",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:30px;font-weight:900;letter-spacing:2px;">UPS</span>`
  },
  {
    name: "MSC",
    label: `<span style="font-family:'Arial Black',sans-serif;font-size:30px;font-weight:900;letter-spacing:2px;">MSC</span>`
  },
  {
    name: "DB Schenker",
    label: `<span style="font-family:Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:3px;line-height:1.3;text-align:center;display:block;">DB<br>SCHENKER</span>`
  },
];

export default function Partners() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1300px] mx-auto px-8 xl:px-16">

        {/* Label */}
        <p className="text-center text-[12px] uppercase tracking-[0.3em] text-gray-500 font-semibold mb-10">
          Nuestros Aliados Estratégicos
        </p>

        {/* Partners pill container */}
        <div className="border border-[#e4e4e4] rounded-[24px] overflow-hidden flex flex-col md:flex-row">
          {partners.map((p, i) => (
            <div 
              key={i}
              className={`flex-1 flex items-center justify-center py-14 px-6
              text-[#cccccc] hover:text-[#999] transition-colors duration-300 cursor-default
              ${i < partners.length - 1 ? 'md:border-r border-b md:border-b-0 border-[#e4e4e4]' : ''}
            `}>
              <span className="sr-only">{p.name}</span>
              <span dangerouslySetInnerHTML={{ __html: p.label }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
