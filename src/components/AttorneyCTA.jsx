import { Button } from "@heroui/react";

export default function PremiumAttorneyCTA() {
  return (
    <div className="w-full bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e2937] to-[#0f172a] text-white shadow-2xl border border-white/10 min-h-[520px]">
          {/* Glow effects */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            {/* LEFT - Content */}
            <div className="md:col-span-3 flex flex-col justify-center px-8 md:px-14 py-12 md:py-0 gap-6">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs tracking-[0.2em] uppercase">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                PREMIUM LEGAL NETWORK
              </div>

              <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tighter">
                Hire elite counsel.
                <br />
                <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Instantly.
                </span>
              </h2>

              <p className="text-slate-400 text-base md:text-lg max-w-md leading-relaxed">
                Connect with top-rated attorneys who are carefully vetted. Get
                matched in minutes, not weeks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-white text-[#0f172a] font-semibold px-9 h-12 rounded-2xl hover:bg-amber-50 active:scale-[0.985] transition-all shadow-lg">
                  Browse Lawyers
                </Button>

                <Button
                  variant="bordered"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 h-12 rounded-2xl transition-all"
                >
                  Join as Attorney
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400 pt-2">
                <div className="flex -space-x-3">
                  <div className="w-7 h-7 rounded-full bg-slate-500 border-2 border-[#0f172a]" />
                  <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-[#0f172a]" />
                  <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#0f172a]" />
                </div>
                <p>
                  Trusted by{" "}
                  <span className="text-white font-medium">12,400+</span>{" "}
                  clients
                </p>
              </div>
            </div>

            {/* RIGHT - Visual */}
            <div className="hidden md:flex md:col-span-2 items-center justify-center relative bg-gradient-to-br from-amber-500/5 to-transparent">
              <div className="text-center">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center mb-6 shadow-inner">
                  <span className="text-6xl">⚖️</span>
                </div>

                <div className="text-xs tracking-[0.25em] text-amber-400 uppercase font-medium">
                  AVERAGE MATCH TIME
                </div>
                <div className="text-[4.2rem] leading-none font-bold mt-1 tracking-tighter">
                  47s
                </div>

                <p className="text-slate-400 text-sm mt-3 max-w-[180px] mx-auto">
                  Get connected with verified lawyers in seconds
                </p>
              </div>

              {/* Floating badges */}
              <div className="absolute top-10 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-2xl text-xs font-medium">
                ✓ Verified
              </div>
              <div className="absolute bottom-12 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-2xl text-xs font-medium">
                15+ Years Exp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
