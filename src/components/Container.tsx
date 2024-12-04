import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto space-y-4 sm:space-y-6 ${className}`}>
      {children}
    </div>
  );
}
