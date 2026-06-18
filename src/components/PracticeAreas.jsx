"use client"; // Next.js App Router-এর জন্য

import React from "react";
import {
  FaGavel,
  FaBriefcase,
  FaHeart,
  FaHouse,
  FaReceipt,
  FaGlobe,
  FaBriefcaseMedical,
  FaShieldHalved,
} from "react-icons/fa6";

export default function PracticeAreas() {
  const practiceAreas = [
    {
      id: 1,
      title: "Criminal Law",
      description: "Defense, white-collar, appeals.",
      icon: FaGavel,
    },
    {
      id: 2,
      title: "Corporate Law",
      description: "M&A, governance, financings.",
      icon: FaBriefcase,
    },
    {
      id: 3,
      title: "Family Law",
      description: "Divorce, custody, mediation.",
      icon: FaHeart,
    },
    {
      id: 4,
      title: "Property Law",
      description: "Real estate & land use.",
      icon: FaHouse,
    },
    {
      id: 5,
      title: "Tax Law",
      description: "IRS, international, planning.",
      icon: FaReceipt,
    },
    {
      id: 6,
      title: "Immigration Law",
      description: "Visas, asylum, citizenship.",
      icon: FaGlobe,
    },
    {
      id: 7,
      title: "Employment Law",
      description: "Workplace & severance.",
      icon: FaBriefcaseMedical,
    },
    {
      id: 8,
      title: "Cyber Law",
      description: "Privacy, GDPR, breach.",
      icon: FaShieldHalved,
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-12 px-6 md:px-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block mb-2">
            Practice Areas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-2">
            Counsel across every legal domain
          </h2>
          <p className="text-gray-500 text-sm">
            Eight specializations, one platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[190px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0b132b] flex items-center justify-center text-amber-500 mb-6">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-normal">
                    {area.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
