import React from "react";
import Image from "next/image";
import { Tabs, Tab } from "@heroui/react";
import {
  FaCheckCircle,
  FaStar,
  FaRegClock,
  FaGlobe,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import HireLawyerModal from "@/components/HireLawyerModal";
import ClientComment from "@/components/client/ClientComment";
import ShowClientComment from "@/components/client/ShowClientComment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function LawyerDetailsPage({ params }) {
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token)
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/${id}`,
    {
      headers:{
        authorization:`Bearer ${token}`
      }
    },
  );

  if (!res.ok) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-5 py-20 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-red-500">Lawyer not found</h2>
          <p className="mt-2 text-gray-500">
            The profile you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const lawyer = await res.json();
  const joinDate = lawyer.createdAt
    ? new Date(lawyer.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-[#F6F8FB] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* TOP SECTION: Profile Overview */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="h-28 bg-[linear-gradient(135deg,#0F2544_0%,#1D5C63_55%,#D8A24A_100%)] sm:h-36" />

          <div className="grid gap-8 px-5 pb-8 sm:px-8 lg:grid-cols-[320px_1fr] lg:px-10">
            {/* Left: Image */}
            <div className="-mt-16">
              <div className="rounded-[26px] border-4 border-white bg-white p-2 shadow-xl">
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-slate-100">
                  <Image
                    src={lawyer.image || "/default-avatar.png"}
                    alt={lawyer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 w-full">
                <HireLawyerModal lawyer={lawyer} />
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-end pt-2 lg:pt-6">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-normal text-[#08152C] sm:text-4xl">
                  {lawyer.name}
                </h1>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FaCheckCircle size={17} />
                </span>
              </div>
              <p className="mt-2 text-base font-medium text-slate-500 sm:text-lg">
                {lawyer.specialization}
              </p>

              {/* Ratings & Status */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-sm">
                  <FaStar className="text-[#D99520]" size={16} />
                  <span className="font-bold text-[#A66C0B]">4.9</span>
                  <span className="text-slate-500 underline">
                    (120 Reviews)
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    lawyer.status === "Available"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${lawyer.status === "Available" ? "bg-emerald-500" : "bg-rose-500"}`}
                  ></div>
                  {lawyer.status === "Available"
                    ? "Available Now"
                    : "Currently Busy"}
                </span>
              </div>

              {/* Summary */}
              <p className="mt-6 max-w-3xl border-y border-slate-100 py-6 text-sm leading-7 text-slate-600 sm:text-base">
                {lawyer.bio ||
                  "This professional has not provided a summary yet."}
              </p>

              {/* Quick Info Grid */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <FaRegClock /> Consultation Fee
                  </span>
                  <span className="mt-2 block font-semibold text-[#08152C]">
                    ${lawyer.fee}{" "}
                    <span className="text-sm font-normal text-slate-400">
                      / session
                    </span>
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <FaBriefcase /> Experience
                  </span>
                  <span className="mt-2 block font-semibold text-[#08152C]">
                    10+ Years
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <FaBriefcase /> Cases Handled
                  </span>
                  <span className="mt-2 block font-semibold text-[#08152C]">
                    300+
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <FaGlobe /> Languages
                  </span>
                  <span className="mt-2 block font-semibold text-[#08152C]">
                    English, Spanish
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2 xl:col-span-1">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <FaCalendarAlt /> Joined
                  </span>
                  <span className="mt-2 block font-semibold text-[#08152C]">
                    {joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Tabs (Using HeroUI Tabs if configured, or simple Tailwind implementation) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6">
          <h3 className="mb-4 text-xl font-semibold text-slate-800">
            Leave a Comment
          </h3>
          <ClientComment lawyer={lawyer}/>

          {/* Reviews Section */}
          <div className="mt-10 border-t border-slate-200 pt-6">
            <ShowClientComment lawyer={lawyer} />
          </div>
        </div>
      </div>
    </div>
  );
}
