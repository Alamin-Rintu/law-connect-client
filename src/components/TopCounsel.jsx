"use client";

import React from "react";
// CardBody বাদ দিয়ে শুধু Card এবং Avatar ইম্পোর্ট করা হয়েছে
import { Card, Avatar } from "@heroui/react";

export default function TopCounsel() {
  const experts = [
    {
      id: 1,
      name: "Priya Shah",
      specialty: "Immigration Law",
      hires: 211,
      rank: 1,
      avatar:
        "https://media.istockphoto.com/id/639115088/photo/portrait-of-a-business-man-outdoors.webp?s=2048x2048&w=is&k=20&c=7N_DRy-lGwkbhaROF0sbLK7OkhBOPld9zR_cF-t24DM=",
    },
    {
      id: 2,
      name: "Sofia Romano",
      specialty: "Family Law",
      hires: 187,
      rank: 2,
      avatar:
        "https://images.unsplash.com/photo-1662104935883-e9dd0619eaba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Caleb Morrison",
      specialty: "Immigration Law",
      hires: 156,
      rank: 3,
      avatar: "https://i.ibb.co.com/wZz3Wq94/lawer1.jpg",
    },
  ];

  return (
    <section className="bg-[#F2F6F9] py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block mb-2">
            Top Legal Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0f172a] tracking-tight mb-2">
            Most hired counsel this quarter
          </h2>
          <p className="text-gray-500 text-sm">
            Track record meets responsiveness.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card
              key={expert.id}
              className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex flex-row items-center gap-5 overflow-visible"
            >
              <div className="relative flex-shrink-0">
                <Avatar src={expert.avatar} className="w-16 h-16" />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                  {expert.rank}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-[#0f172a] leading-tight font-serif">
                  {expert.name}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">
                  {expert.specialty}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  <strong className="text-gray-700 font-bold">
                    {expert.hires}
                  </strong>{" "}
                  total hires
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
