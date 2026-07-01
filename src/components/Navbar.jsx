"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = user
    ? [
        { name: "Home", href: "/" },
        { name: "Browse Lawyers", href: "/browesLawyers" },
        {
          name: "Dashboard",
          href: `/dashboard/${user.role}`,
        },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Browse Lawyers", href: "/browesLawyers" },
      ];

  return (
    <>
      <style>{`
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          transition: all 0.3s ease;
        }
        .nav-root.scrolled {
          box-shadow: 0 4px 24px rgba(11, 25, 54, 0.10);
        }
        .nav-inner {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(11,25,54,0.07);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .logo-img-wrap {
          background: linear-gradient(135deg, #0B1936 0%, #1a3168 100%);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 4px 14px rgba(11,25,54,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .logo-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0B1936;
          letter-spacing: -0.01em;
        }
        .logo-tagline {
          font-size: 0.65rem;
          font-weight: 500;
          color: #C9A84C;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .desktop-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        @media (max-width: 768px) {
          .desktop-links { display: none; }
          .desktop-auth { display: none; }
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease;
          letter-spacing: 0.01em;
        }
        .nav-link:hover {
          color: #0B1936;
          background: rgba(11,25,54,0.04);
        }
        .nav-link.active {
          color: #0B1936;
          font-weight: 600;
        }
        .nav-link-underline {
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          background: #C9A84C;
          border-radius: 2px;
          width: 0;
          transition: width 0.25s ease;
        }
        .nav-link.active .nav-link-underline {
          width: calc(100% - 24px);
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .desktop-auth {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-signin {
          padding: 0.5rem 1.25rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0B1936;
          border: 1.5px solid rgba(11,25,54,0.15);
          background: transparent;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-signin:hover {
          background: rgba(11,25,54,0.05);
          border-color: rgba(11,25,54,0.3);
        }
        .btn-started {
          padding: 0.5rem 1.35rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #0B1936 0%, #1a3168 100%);
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(11,25,54,0.22);
          letter-spacing: 0.01em;
        }
        .btn-started:hover {
          box-shadow: 0 4px 18px rgba(11,25,54,0.32);
          transform: translateY(-1px);
        }

        /* Avatar Dropdown */
        .avatar-wrap {
          position: relative;
        }
        .avatar-trigger {
          cursor: pointer;
          border-radius: 50%;
          border: 2.5px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #C9A84C, #0B1936) border-box;
          padding: 0;
          display: flex;
          transition: transform 0.2s ease;
        }
        .avatar-trigger:hover {
          transform: scale(1.05);
        }
        .avatar-trigger img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        .avatar-fallback {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0B1936, #1a3168);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 230px;
          background: #fff;
          border: 1px solid rgba(11,25,54,0.09);
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(11,25,54,0.14);
          overflow: hidden;
          animation: dropIn 0.18s ease;
          transform-origin: top right;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .dropdown-header {
          padding: 1rem 1.1rem 0.85rem;
          border-bottom: 1px solid rgba(11,25,54,0.07);
          background: linear-gradient(135deg, rgba(11,25,54,0.03), rgba(201,168,76,0.05));
        }
        .dropdown-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0B1936;
          margin: 0 0 0.15rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-email {
          font-size: 0.75rem;
          color: #94A3B8;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-role-badge {
          display: inline-block;
          margin-top: 0.4rem;
          padding: 0.15rem 0.5rem;
          background: rgba(201,168,76,0.12);
          color: #A07830;
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .dropdown-body {
          padding: 0.5rem;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .dropdown-item:hover {
          background: rgba(11,25,54,0.05);
          color: #0B1936;
        }
        .dropdown-item.danger:hover {
          background: rgba(220,38,38,0.06);
          color: #DC2626;
        }
        .dropdown-divider {
          height: 1px;
          background: rgba(11,25,54,0.07);
          margin: 0.25rem 0;
        }

        /* Mobile menu button */
        .mobile-menu-btn {
          display: none;
          padding: 0.5rem;
          border-radius: 10px;
          border: 1.5px solid rgba(11,25,54,0.1);
          background: transparent;
          cursor: pointer;
          color: #0B1936;
          transition: background 0.15s ease;
        }
        .mobile-menu-btn:hover {
          background: rgba(11,25,54,0.05);
        }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex; align-items: center; }
          .nav-container { height: 60px; padding: 0 1rem; }
        }

        /* Mobile Drawer */
        .mobile-drawer-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(11,25,54,0.35);
          z-index: 49;
          animation: fadeIn 0.2s ease;
        }
        .mobile-drawer-backdrop.open {
          display: block;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #fff;
          z-index: 50;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 4px 0 30px rgba(11,25,54,0.12);
        }
        .mobile-drawer.open {
          transform: translateX(0);
        }
        .drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .drawer-close-btn {
          padding: 0.4rem;
          border-radius: 8px;
          border: 1.5px solid rgba(11,25,54,0.1);
          background: transparent;
          cursor: pointer;
          color: #64748B;
          display: flex;
          transition: background 0.15s;
        }
        .drawer-close-btn:hover { background: rgba(11,25,54,0.05); }
        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .drawer-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .drawer-link.active {
          background: rgba(11,25,54,0.06);
          color: #0B1936;
          font-weight: 600;
        }
        .drawer-link:hover {
          background: rgba(11,25,54,0.04);
          color: #0B1936;
        }
        .drawer-link .drawer-link-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9A84C;
          margin-right: 0.75rem;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .drawer-link.active .drawer-link-dot { opacity: 1; }
        .drawer-footer {
          margin-top: auto;
          border-top: 1px solid rgba(11,25,54,0.07);
          padding-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .drawer-user-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, rgba(11,25,54,0.04), rgba(201,168,76,0.05));
          border-radius: 12px;
          border: 1px solid rgba(11,25,54,0.07);
        }
        .drawer-user-info .name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0B1936;
        }
        .drawer-user-info .email {
          font-size: 0.7rem;
          color: #94A3B8;
        }
        .btn-full-primary {
          display: block;
          text-align: center;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #0B1936, #1a3168);
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(11,25,54,0.22);
          transition: all 0.2s ease;
        }
        .btn-full-primary:hover {
          box-shadow: 0 4px 18px rgba(11,25,54,0.32);
          transform: translateY(-1px);
        }
        .btn-full-outline {
          display: block;
          text-align: center;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0B1936;
          border: 1.5px solid rgba(11,25,54,0.15);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-full-outline:hover { background: rgba(11,25,54,0.04); }
        .btn-full-danger {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #DC2626;
          background: rgba(220,38,38,0.06);
          border: none;
          cursor: pointer;
          width: 100%;
          transition: background 0.15s;
        }
        .btn-full-danger:hover { background: rgba(220,38,38,0.1); }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-container">
            {/* Left */}
            <div className="nav-left">
              <Link href="/" className="group flex flex-col">
                <h1 className="text-2xl font-black tracking-tight text-[#0B1936] transition-all duration-300 group-hover:text-blue-700">
                  LawConnect
                </h1>

                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  Trusted Legal Platform
                </p>
              </Link>

              <div className="desktop-links">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nav-link${isActive ? " active" : ""}`}
                    >
                      {item.name}
                      <span className="nav-link-underline" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="nav-right">
              {!user ? (
                <div className="desktop-auth">
                  <Link href="/signin" className="btn-signin">
                    Sign In
                  </Link>
                  <Link href="/signup" className="btn-started">
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="avatar-wrap" ref={dropdownRef}>
                  <button
                    className="avatar-trigger"
                    onClick={() => setIsDropdownOpen((v) => !v)}
                    aria-label="Open user menu"
                  >
                    {user?.image ? (
                      <img src={user.image} alt={user?.name || "User"} />
                    ) : (
                      <div className="avatar-fallback">
                        {(user?.name || "U").slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <p className="dropdown-name">{user?.name}</p>
                        <p className="dropdown-email">{user?.email}</p>
                        {user?.role && (
                          <span className="dropdown-role-badge">
                            {user.role}
                          </span>
                        )}
                      </div>
                      <div className="dropdown-body">
                        <Link
                          href={`/dashboard/${user?.role}`}
                          className="dropdown-item"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <MdDashboard size={16} />
                          Dashboard
                        </Link>

                        <div className="dropdown-divider" />
                        <button
                          className="dropdown-item danger"
                          onClick={handleSignOut}
                        >
                          <BiLogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <HiMenuAlt3 size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer-backdrop${isMenuOpen ? " open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div className={`mobile-drawer${isMenuOpen ? " open" : ""}`}>
        <div className="drawer-top">
          <Link
            href="/"
            className="logo-wrap"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="logo-text">
              <span className="logo-name">LawConnect</span>
              <span className="logo-tagline">Legal Platform</span>
            </div>
          </Link>
          <button
            className="drawer-close-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <HiX size={18} />
          </button>
        </div>

        <div className="drawer-links">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`drawer-link${isActive ? " active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="drawer-link-dot" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="drawer-footer">
          {!user ? (
            <>
              <Link
                href="/signin"
                className="btn-full-outline"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-full-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="drawer-user-card">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt={user?.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div className="avatar-fallback" style={{ flexShrink: 0 }}>
                    {(user?.name || "U").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="drawer-user-info">
                  <div className="name">{user?.name}</div>
                  <div className="email">{user?.email}</div>
                </div>
              </div>
              <Link
                href={`/dashboard/${user?.role}`}
                className="btn-full-outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <MdDashboard size={16} /> Dashboard
              </Link>
              <button className="btn-full-danger" onClick={handleSignOut}>
                <BiLogOut size={16} /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
