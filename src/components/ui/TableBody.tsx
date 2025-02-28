import React from "react";

type TableBodyProps = {
  children: React.ReactNode;
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="bg-[#1D8E42] text-white dark:text-black text-xs md:text-sm">
      {children}
    </tbody>
  );
};

export default TableBody;