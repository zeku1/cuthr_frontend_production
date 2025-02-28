import React from "react";

interface StatCardProps {
  value: number | string;
  total: number | string;
  label: string;
  statStyle?: React.CSSProperties; // Optional prop for custom styles
}

const StatCard: React.FC<StatCardProps> = ({ value, total, label, statStyle }) => {
  const [firstLine, ...rest] = label.split(" ");
  const secondLine = rest.join(" ");

  return (
    <div className="flex flex-col items-end text-right">
      <div className="flex flex-col items-end">
        <div
          className="text-7xl md:text-8xl font-bold"
          style={{ color: "#1D8E42", ...statStyle }}
        >
          {value}
        </div>
        <div
          className="text-2xl md:text-4xl font-bold"
          style={{ color: "#1D8E42", ...statStyle }}
        >
          {total}
        </div>
      </div>
      <div className="text-xs md:text-sm" style={{ color: "#1D8E42" }}>
        <div className="block md:hidden">
          <div>{firstLine}</div>
          <div>{secondLine}</div>
        </div>
        <div className="hidden md:block">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;