"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import logoImg from "../../public/lawyer.logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Lawyers",
      href: "/browesLawyers",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoImg}
              alt="LawConnect"
              width={50}
              height={50}
              priority
              className="rounded-lg object-cover"
            />

            <span className="text-lg md:text-xl font-bold text-slate-900">
              LawConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <Link href="/signin">
                  <Button variant="light">Sign In</Button>
                </Link>

                <Link href="/signup">
                  <Button className="bg-[#0B1936] text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Dropdown>
              <Dropdown.Trigger>
                <Avatar
                  src={user?.image || undefined}
                  name={user?.name || "U"}
                  className="w-10 h-10 cursor-pointer border-2 border-slate-200"
                />
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <div className="min-w-[220px] border-b p-4">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <Dropdown.Menu>
                  <Dropdown.Item id="dashboard">
                    <Link
                      href={`/dashboard/${user?.role}`}
                      className="flex w-full items-center gap-2"
                    >
                      <MdDashboard />
                      Dashboard
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    variant="danger"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center gap-2">
                      <BiLogOut />
                      Logout
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-slate-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-2 p-4">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="border-t pt-4">
              {!user ? (
                <div className="space-y-2">
                  <Link href="/signin">
                    <Button className="w-full" variant="light">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button className="w-full bg-[#0B1936] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="block rounded-lg px-4 py-3 text-sm font-medium"
                  >
                    Dashboard
                  </Link>

                  <Button
                    onPress={handleSignOut}
                    color="danger"
                    variant="light"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
