"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, Button, Dropdown, Label, SearchField } from "@heroui/react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import logoImg from "../../public/lawyer.logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- FRONTEND SIMULATION STATES ---
  // Change isLoggedIn to true/false to test the logged-in vs logged-out design layout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mockUser = {
    name: "Alex Morgan",
    email: "alex.morgan@lawconnect.com",
    image: "logoImg", // Add avatar string source if available
    role: "corporate-lawyer", // Dynamic role parameter for dashboard route mapping
  };

  // Hide Navbar layout explicitly on isolated dashboard workflows
  if (pathname?.includes("dashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left Section: Branding & Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Hamburger Mobile Menu Button */}
          <button
            className="block md:hidden text-[#0B1936] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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

          {/* Logo / Site Title */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                height={80}
                width={80}
                loading="eager"
                src={logoImg}
                alt="LawConnect logo"
              />
              <p className="text-xl font-bold text-[#0B1936]">LawConnect</p>
            </div>
          </Link>

          {/* Desktop Links with Active State Highlighting */}
          <ul className="hidden items-center gap-2 md:flex">
            <li>
              <Link
                href="/"
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
                  pathname === "/"
                    ? "bg-[#EDF2F7] text-[#1A202C]"
                    : "text-[#718096] hover:text-[#1A202C]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/lawyers"
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                  pathname.startsWith("/lawyers")
                    ? "bg-[#EDF2F7] text-[#1A202C] font-semibold"
                    : "text-[#718096] hover:text-[#1A202C]"
                }`}
              >
                Browse Lawyers
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Universal Search Component & Session Routing */}
        <div className="flex items-center gap-6">
          {/* Search Box Component */}
          <div className="hidden lg:block">
            <SearchField name="search">
              <SearchField.Group className="flex items-center gap-2 rounded-full bg-[#F7FAFC] px-4 py-1.5 border border-gray-100 w-[340px]">
                <SearchField.SearchIcon className="text-gray-400 w-4 h-4" />
                <SearchField.Input
                  className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
                  placeholder="Search lawyers, specialties..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>

          {/* Condition A: Unauthenticated State UI */}
          {!isLoggedIn && (
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/signin"
                className="text-sm font-semibold text-[#1A202C] hover:text-[#0B1936]"
              >
                Sign in
              </Link>
              <Link href="/signup">
                <Button className="rounded-xl bg-[#0B1936] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#152649] transition-all">
                  Get started
                </Button>
              </Link>
            </div>
          )}

          {/* Condition B: Authenticated User Layout (Dashboard Dropdown) */}
          {isLoggedIn && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer focus:outline-none">
                  <Avatar size="sm" aria-label="User Account Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={mockUser.name}
                      src={mockUser.image}
                    />
                    <Avatar.Fallback className="bg-[#0B1936] text-white text-xs">
                      {mockUser.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image
                          alt={mockUser.name}
                          src={mockUser.image}
                        />
                        <Avatar.Fallback className="bg-[#0B1936] text-white text-xs">
                          {mockUser.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-[#1A202C] leading-none mb-1">
                          {mockUser.name}
                        </p>
                        <p className="text-xs text-gray-500 leading-none">
                          {mockUser.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Dropdown.Menu
                    onAction={(key) => console.log(`Navigating to: ${key}`)}
                  >
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      <Link
                        className="flex items-center gap-2 w-full text-gray-700"
                        href={`/dashboard/${mockUser.role}`}
                      >
                        <MdDashboard className="text-gray-500" />
                        <Label className="cursor-pointer">Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                      <Link
                        className="flex items-center gap-2 w-full text-gray-700"
                        href="/profile"
                      >
                        <CgProfile className="text-gray-500" />
                        <Label className="cursor-pointer">Profile</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={() => setIsLoggedIn(false)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <BiLogOut />
                        <Label className="cursor-pointer">Logout</Label>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu Layout */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 md:hidden bg-white animate-fade-in">
          <ul className="flex flex-col gap-1 p-4">
            {/* Global Search inside Mobile View Drawer */}
            <li className="mb-3 block lg:hidden">
              <SearchField name="search-mobile">
                <SearchField.Group className="flex items-center gap-2 rounded-xl bg-[#F7FAFC] px-3 py-2 border border-gray-100">
                  <SearchField.SearchIcon className="text-gray-400 w-4 h-4" />
                  <SearchField.Input
                    className="bg-transparent text-sm text-gray-700 outline-none w-full"
                    placeholder="Search..."
                  />
                </SearchField.Group>
              </SearchField>
            </li>

            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${pathname === "/" ? "bg-[#EDF2F7] text-gray-900 font-semibold" : "text-gray-600"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/lawyers"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${pathname.startsWith("/lawyers") ? "bg-[#EDF2F7] text-gray-900 font-semibold" : "text-gray-600"}`}
              >
                Browse Lawyers
              </Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link
                  href={`/dashboard/${mockUser.role}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${pathname.includes("/dashboard") ? "bg-[#EDF2F7] text-gray-900 font-semibold" : "text-gray-600"}`}
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li className="mt-2 pt-4 border-t border-gray-100 flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center py-2.5 text-sm font-semibold text-[#1A202C]"
                  >
                    Sign in
                  </Link>
                  <Button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-[#0B1936] text-white rounded-xl py-2.5 text-sm font-semibold"
                  >
                    Get started
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  variant="light"
                  className="w-full text-red-600 text-sm font-medium py-2.5"
                >
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
