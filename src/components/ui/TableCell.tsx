import React from "react";

type TableCellProps = {
  children: React.ReactNode;
};

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="p-2 border-b border-white-300 text-white text-xs md:text-sm">{children}</td>;
};

export default TableCell;