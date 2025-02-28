import React from "react";

type TableHeaderProps = {
  children: React.ReactNode;
};

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <th className="p-2 text-center border-b border-white-300 font-semibold text-white uppercase text-xs md:text-sm">
      {children}
    </th>
  );
};

export default TableHeader;