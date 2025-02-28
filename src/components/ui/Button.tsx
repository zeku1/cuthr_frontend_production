import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition text-sm md:text-base ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;