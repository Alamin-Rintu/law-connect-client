import React from "react";
import { Button, Link } from "@heroui/react";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
// import { ArrowRight } from "@gravity-ui/icons";

export default function Banner() {
  const features = [
    "Vetted attorneys",
    "Transparent fees",
    "Secure payments",
    "1-click hiring",
    "Verified reviews",
    "8 practice areas",
  ];

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#071126] text-white overflow-hidden px-6 py-16 md:px-12 lg:px-24">
      {/* Background Scales of Justice Silhouette */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none mix-blend-lighten scale-90 md:scale-100"
        style={{
          backgroundImage: `url('https://justatic.com/v/20251010095054/marketing/files/new/production/images/portal/lawyers-legal-process.jpg')`,
        }}
      />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
            Trusted Legal Marketplace
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight font-medium leading-tight">
            Find <span className="italic font-normal">&</span> Hire{" "}
            <span className="text-amber-500 font-semibold">
              Expert Legal Counsel
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
            Browse vetted attorneys by specialization, see transparent fees, and
            pay securely once your case is accepted. No retainer guesswork.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/browesLawyers">
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900 font-semibold shadow-lg shadow-amber-500/20 px-6"
                radius="sm"
                endContent={<BsArrowRightShort />}
              >
                Browse Lawyers
              </Button>
            </Link>
         <Link href="/signup">
            <Button
              variant="outline"
              className="border-gray-700 hover:border-gray-500 text-white font-medium px-6"
              radius="sm"
            >
              Become a Lawyer
            </Button></Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 pt-6 w-full max-w-xl border-t border-gray-800/60">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <BiCheckCircle size={14} className="text-amber-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Testimonial Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-2xl relative group hover:border-slate-700 transition-colors duration-300">
            {/* Tiny Badge inside card */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-4">
              <BiCheckCircle size={12} />
              Verified Counsel
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-200 font-serif text-lg leading-relaxed mb-6">
              LegalEase paired me with the right corporate attorney in under an
              hour.
            </p>

            {/* Author */}
            <div className="text-xs text-gray-400 font-medium">
              — Founder, <span className="text-gray-300">Series A SaaS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
