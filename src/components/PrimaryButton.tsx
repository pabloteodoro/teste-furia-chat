import React from "react";




interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white py-3 px-6 rounded-lg font-bold transition ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;