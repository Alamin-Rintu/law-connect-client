import LawyersCard from "@/components/LawyersCard";
import React from "react";

const BrowseLawyers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer`, {
    cache: "no-store",
  });
  const allLawyers = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#08152C]">
        <div className="text-white p-10 max-w-7xl mx-auto">
          <h3 className="text-[#CF9304] text-sm font-bold tracking-wider uppercase mb-2">
            Directory
          </h3>
          <h1 className="text-4xl font-bold mb-3">Browse expert counsel</h1>
          <p className="text-[#B0B5A6] text-lg">
            Filter by practice area, availability, and consultation fee.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <h3 className="font-semibold text-lg">{allLawyers.length} lawyers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {allLawyers.map((lawyer) => (
            <LawyersCard key={lawyer._id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseLawyers;
