import React from "react";
import clsx from "clsx";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx("relative flex items-center justify-center gap-2 px-5 py-2 text-white font-bold text-sm border-2 border-white/30 bg-blue-700 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/60 overflow-hidden", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
      <span className="absolute inset-0 w-[100px] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-60 -left-24 animate-shine"></span>
    </button>
  );
};

export default Button;