import React from 'react';

interface TableRowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ children, style }) => {
  return (
    <tr 
      className="text-center hover:bg-[#3BB13B] transition-colors"
      style={style}
    >
      {children}
    </tr>
  );
};

export default TableRow;