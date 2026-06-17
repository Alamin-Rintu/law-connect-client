"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import logoImg from "../../public/lawyer.logo.jpg";


export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  // Frontend-only handler for the newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="mt-16 bg-[#020b1e] text-slate-300">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Main Footer Layout */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand/About Section */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex items-center gap-3 cursor-pointer">
                <Image
                  height={80}
                  width={80}
                  loading="eager"
                  src={logoImg}
                  alt="LawConnect logo"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                LawConnect
              </span>
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              The modern marketplace for hiring vetted attorneys. Transparent
              fees, secure payments, and workflows built for efficiency.
            </p>

            {/* Social Media Icons */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <BsInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <BsTwitterX className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/browse-lawyers"
                  className="hover:text-white transition-colors"
                >
                  Browse Lawyers
                </Link>
              </li>
              <li>
                <Link
                  href="/become-lawyer"
                  className="hover:text-white transition-colors"
                >
                  Become a Lawyer
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Column (Frontend only) */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-slate-400">
              Subscribe to our newsletter for updates.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-sm"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-md bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f2a104]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-md bg-[#f2a104] px-4 py-2 text-sm font-medium text-[#020b1e] hover:bg-[#d68e03] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="border-t border-slate-800/60 py-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} LawConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
