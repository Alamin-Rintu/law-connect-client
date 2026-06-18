"use client";

import React from "react";
import { Card } from "@heroui/react";
import { FaQuoteLeft } from "react-icons/fa6";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote:
        "Found and hired a corporate attorney in 30 minutes. The fee transparency alone is a game-changer.",
      author: "Sarah Levin",
      role: "Founder, Northstar Labs",
    },
    {
      id: 2,
      quote:
        "Used LegalEase for an employment matter. Vetting felt rigorous; communication was excellent.",
      author: "Diego Alvarez",
      role: "Restaurant Group COO",
    },
    {
      id: 3,
      quote:
        "Filed my O-1 with help from Priya. Could not recommend this platform more highly.",
      author: "Kenji Tan",
      role: "Immigrant entrepreneur",
    },
  ];

  return (
    <section className="bg-[#020b1e] py-20 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase block mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-tight mb-3">
            Clients & counsel agree
          </h2>
          <p className="text-gray-400 text-sm font-normal">
            Real stories from the LegalEase community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="bg-[#071330] border border-gray-800/60 p-8 rounded-2xl flex flex-col justify-between min-h-[240px] shadow-lg transition-all duration-300"
            >
              <div>
                <div className="text-amber-500 mb-5">
                  <FaQuoteLeft size={24} />
                </div>
                <p className="text-gray-200 text-base font-serif leading-relaxed mb-6">
                  {item.quote}
                </p>
              </div>
              <div>
                <h4 className="text-gray-100 font-bold text-sm tracking-wide">
                  {item.author}
                </h4>
                <p className="text-gray-500 text-xs mt-0.5">{item.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
