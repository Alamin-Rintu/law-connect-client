"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label, SearchField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import logoImg from "../../public/lawyer.logo.jpg"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg">
        <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Left Side: Brand Logo and Navigation */}
          <div className="flex items-center gap-8">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
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

            <Link href={"/"}>
              <div className="flex items-center gap-3">
                <Image
                  height={50}
                  width={100}
                  loading="eager"
                  src={logoImg}
                  alt="LawConnect logo"
                />
                <p className="text-xl font-bold text-[#0B1936]">LawConnect</p>
              </div>
            </Link>

            <ul className="hidden items-center gap-6 md:flex">
              <li className="rounded-xl bg-[#EDF2F7] px-4 py-2">
                <Link
                  href="/"
                  className="text-sm font-semibold text-[#1A202C]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/lawyers"
                  className="text-sm font-medium text-[#718096] hover:text-[#1A202C]"
                >
                  Browse Lawyers
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side: Search and Authentication */}
          <div className="flex items-center gap-6">
            {/* Search Input Box */}
            <div className="hidden lg:block">
              <SearchField name="search">
                <SearchField.Group className="flex items-center gap-2 rounded-full bg-[#F7FAFC] px-4 py-2 border border-gray-100 w-[320px]">
                  <SearchField.SearchIcon className="text-gray-400 w-4 h-4" />
                  <SearchField.Input
                    className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
                    placeholder="Search lawyers, specialties..."
                  />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
            </div>

            {/* User Session Configurations */}
            {!user && (
              <div className="hidden items-center gap-6 md:flex">
                <Link
                  href="/signin"
                  className="text-sm font-semibold text-[#1A202C]"
                >
                  SignIn
                </Link>
                <Link href="/signup">
                  <Button className="rounded-xl bg-[#0B1936] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#152649]">
                    Get started
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <div className="hidden items-center gap-4 md:flex">
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full cursor-pointer">
                    <Avatar size="sm" aria-label="Menu">
                      <Avatar.Image
                        referrerPolicy="no-referrer"
                        alt={user?.name}
                        src={user?.image}
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-2">
                        {/* <Avatar size="sm">
                          <Avatar.Image alt={user?.name} src={user?.image} />
                          <Avatar.Fallback>U</Avatar.Fallback>
                        </Avatar> */}
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-medium">
                            {user?.name}
                          </p>
                          <p className="text-xs leading-none text-muted">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Menu
                      onAction={(key) => console.log(`Selected: ${key}`)}
                    >
                      <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link
                          className="flex items-center gap-2"
                          href={`/dashboard/${user?.role}`}
                        >
                          <MdDashboard />
                          <Label>Dashboard</Label>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item id="profile" textValue="Profile">
                        <div className="flex items-center gap-2">
                          <CgProfile />
                          <Label>Profile</Label>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        onClick={handleSignOut}
                      >
                        <div className="flex items-center gap-2">
                          <BiLogOut />
                          <Label>Logout</Label>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 md:hidden bg-white">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="/" className="block py-2 font-medium text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/lawyers" className="block py-2 text-gray-600">
                  Browse Lawyers
                </Link>
              </li>
              <li className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
                <Link
                  href="/signin"
                  className="block py-2 text-gray-900 font-medium"
                >
                  SignIn
                </Link>
                <Button className="w-full bg-[#0B1936] text-white">
                  Get started
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
