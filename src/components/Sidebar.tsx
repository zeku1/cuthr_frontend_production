"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 w-screen md:hidden z-50">
        <div className="flex items-center justify-between px-[4vw] py-[3vw]">
          <Image
            src="/images/cuthr.png"
            alt="CUTHR+"
            width={120}
            height={40}
            className="w-[30vw] h-auto"
            priority
          />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1D8E42] hover:text-[#4CE147] focus:outline-none text-[4vw]"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 w-65 h-screen flex-col p-4 pl-8 pr-10 bg-[#F6E8D6] text-[#1D8E42]">
        {/* Desktop Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/cuthr.png"
            alt="CUTHR+"
            width={120}
            height={40}
            className="w-auto h-auto"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 font-thin rounded-lg transition hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            className="flex items-center gap-2 p-2 font-thin rounded-lg transition hover:bg-gray-100"
          >
            Add new event
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 p-2 font-thin rounded-lg transition hover:bg-gray-100"
          >
            User and Roles
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div className="mt-auto">
          <Link
            href="/logout"
            className="flex items-center gap-2 p-2 font-thin rounded-lg transition hover:bg-gray-100"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-[80vw] h-full bg-[#F6E8D6] text-[#1D8E42] shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-[2vw] mt-[24vw] px-[4vw]">
          <Link
            href="/dashboard"
            className="flex items-center gap-[2vw] p-[2vw] text-[4vw] font-thin rounded-lg transition hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            className="flex items-center gap-[2vw] p-[2vw] text-[4vw] font-thin rounded-lg transition hover:bg-gray-100"
          >
            Add new event
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-[2vw] p-[2vw] text-[4vw] font-thin rounded-lg transition hover:bg-gray-100"
          >
            User and Roles
          </Link>
        </nav>

        <div className="mt-auto mb-[4vw] px-[4vw]">
          <Link
            href="/logout"
            className="flex items-center gap-[2vw] p-[2vw] text-[4vw] font-thin rounded-lg transition hover:bg-gray-100"
          >
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
