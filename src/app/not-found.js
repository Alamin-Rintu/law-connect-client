import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e2937] to-[#0f172a] text-white shadow-2xl border border-white/10 min-h-[560px] flex items-center">
          {/* Background Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] bg-amber-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 px-8 md:px-16 py-16 text-center mx-auto max-w-lg">
            {/* Large 404 */}
            <div className="relative mb-8">
              <h1 className="text-[180px] md:text-[220px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400">
                404
              </h1>
              <div className="absolute -top-6 right-4 text-amber-400 text-6xl rotate-12">
                ⚖️
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Page Not Found
              </h2>

              <p className="text-slate-400 text-lg max-w-sm mx-auto">
                The page you are looking for has been moved, deleted, or never
                existed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="/">
                <Button className="bg-white text-[#0f172a] font-semibold px-10 h-14 rounded-2xl hover:bg-amber-50 active:scale-[0.985] transition-all text-lg shadow-xl w-full sm:w-auto">
                  Return to Homepage
                </Button>
              </Link>

              <Link href="/lawyers">
                <Button
                  variant="bordered"
                  className="border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium px-10 h-14 rounded-2xl transition-all text-lg w-full sm:w-auto"
                >
                  Browse Lawyers
                </Button>
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                Trusted Network
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                15,000+ Clients
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                Verified Attorneys
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 opacity-30">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
