import React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({
  children,
  className = "",
}: GlassContainerProps) {
  return (
    <div
      className={`backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}
