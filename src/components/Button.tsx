import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "secondary",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-3 py-1 text-sm transition-colors flex items-center gap-2 rounded-md";
  const variantStyles = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-white/20 hover:bg-white/30 text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
