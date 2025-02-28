import React from "react";

type CardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

const Card: React.FC<CardProps> = ({ title, value, subtitle }) => {
  return (
    <div className="p-4 bg-green-600 text-white rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="text-3xl md:text-4xl font-bold">{value}</p>
      {subtitle && <p className="text-sm md:text-base opacity-75">{subtitle}</p>}
    </div>
  );
};

export default Card;