import React from "react";

const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <thead className="bg-[#1D8E42] text-white text-xs md:text-sm">
      {children}
    </thead>
  );
};

export default TableHead;