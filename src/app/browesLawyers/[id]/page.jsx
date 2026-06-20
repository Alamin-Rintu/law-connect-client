import React from "react";
import Image from "next/image";
// import HireLawyerModal from "@/components/lawyer/HireLawyerModal";
// Import HeroUI components as needed for your tabs/layout
import { Tabs, Tab } from "@heroui/react"; 
import { FaCheckCircle, FaStar, FaRegClock, FaGlobe, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import HireLawyerModal from "@/components/HireLawyerModal";

export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;

  // 1. Fetch Data
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">Lawyer not found</h2>
        <p className="text-gray-500 mt-2">The profile you are looking for does not exist.</p>
      </div>
    );
  }

  const lawyer = await res.json();
  const joinDate = lawyer.createdAt ? new Date(lawyer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently";

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      
      {/* TOP SECTION: Profile Overview */}
      <div className="grid md:grid-cols-3 gap-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Left: Image */}
        <div className="col-span-1">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={lawyer.image || "/default-avatar.png"}
              alt={lawyer.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <HireLawyerModal lawyer={lawyer} />
            <button className="flex-1 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium transition-colors">
              Message
            </button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="col-span-2 flex flex-col justify-center">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-[#08152C]">{lawyer.name}</h1>
            <FaCheckCircle className="text-blue-500" size={18} />
          </div>
          <p className="text-lg text-gray-500 mb-4">{lawyer.specialization}</p>

          {/* Ratings & Status */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-sm">
              <FaStar className="text-[#E6A337]" size={18} />
              <span className="font-bold text-[#E6A337] text-lg">4.9</span>
              <span className="text-gray-400 underline">(120 Reviews)</span>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              lawyer.status === "Available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}>
              <div className={`w-2 h-2 rounded-full ${lawyer.status === "Available" ? "bg-green-500" : "bg-red-500"}`}></div>
              {lawyer.status === "Available" ? "Available Now" : "Currently Busy"}
            </span>
          </div>

          {/* Summary */}
          <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
            {lawyer.bio || "This professional has not provided a summary yet."}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-2"><FaRegClock /> Consultation Fee</span>
              <span className="font-semibold text-[#08152C]">${lawyer.fee} <span className="text-gray-400 font-normal">/ session</span></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-2"><FaBriefcase /> Experience</span>
              <span className="font-semibold text-[#08152C]">10+ Years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-2"><FaBriefcase /> Cases Handled</span>
              <span className="font-semibold text-[#08152C]">300+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-2"><FaGlobe /> Languages</span>
              <span className="font-semibold text-[#08152C]">English, Spanish</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-2"><FaCalendarAlt /> Joined</span>
              <span className="font-semibold text-[#08152C]">{joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Tabs (Using HeroUI Tabs if configured, or simple Tailwind implementation) */}
      <div className="mt-10">
        {/* Fallback to simple Tailwind Tabs if HeroUI <Tabs> isn't globally available */}
        <div className="flex gap-8 border-b border-gray-200 text-sm font-medium text-gray-500 mb-8">
          <button className="pb-4 border-b-2 border-[#1a73e8] text-[#1a73e8]">About</button>
          <button className="pb-4 hover:text-gray-800">Services</button>
          <button className="pb-4 hover:text-gray-800">Reviews (120)</button>
          <button className="pb-4 hover:text-gray-800">Comments (80)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="text-gray-600 leading-8">
            {lawyer.bio}
          </div>
          
          {/* Mock Education Card based on the design */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-bold text-[#08152C] mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800">Harvard Law School</h4>
                <p className="text-sm text-gray-500">LL.M in Corporate Law</p>
                <p className="text-xs text-gray-400 mt-1">2012</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Yale University</h4>
                <p className="text-sm text-gray-500">LL.B</p>
                <p className="text-xs text-gray-400 mt-1">2010</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}