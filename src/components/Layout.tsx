"use client";

import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#F6E8D6]">
      <Sidebar />
      <main className="flex-1 md:ml-[200px] p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
