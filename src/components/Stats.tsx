import React from 'react';

const stats = [
  { number: "15", label: "Years Experience" },
  { number: "50k", label: "Tons Transported" },
  { number: "20", label: "Connected Ports" },
  { number: "200", label: "Happy Clients" },
];

export default function Stats() {
  return (
    <section className="py-[200px] bg-white font-['Work_Sans',sans-serif]">
      <div className="w-full max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[80px] lg:text-[100px] leading-none font-bold text-gray-900 mb-4 tracking-tighter">
                {stat.number}
              </span>
              <div className="w-12 h-[2px] bg-[#FC3D03] mb-6"></div>
              <p className="text-[14px] uppercase tracking-[0.2em] text-[#6e6e6e] font-bold">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
