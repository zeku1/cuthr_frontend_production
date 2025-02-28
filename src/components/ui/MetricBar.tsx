import React from "react";

const MetricBar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const progress = Math.max(0, Math.min(1, value / max)) * 100;

  return (
    <div className="flex items-center gap-4 md:gap-8">
      <span className="w-12 md:w-16 text-xs md:text-sm uppercase font-bold" style={{ color: "#1D8E42" }}>
        {label}
      </span>
      <span className="text-sm md:text-base font-bold" style={{ color: "#1D8E42" }}>
        {value}
      </span>
      <div className="flex-1 h-2 bg-[#F6E8D6]-200 rounded">
        <div 
          className="h-full rounded"
          style={{ width: `${progress}%`, backgroundColor: "#1D8E42" }}
        />
      </div>
    </div>
  );
};

export default MetricBar;