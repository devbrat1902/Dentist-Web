import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'large';
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'default',
  ...props 
}: ButtonProps) {
  
  const baseClasses = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 ease-out motion-safe:hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black";
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-neutral-800 border border-black",
    secondary: "bg-white text-black hover:bg-neutral-100 border border-transparent shadow-sm",
    outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white"
  };

  const sizeClasses = {
    default: "px-6 py-3 text-sm md:text-base",
    large: "px-5 py-3 md:px-8 md:py-5 text-base md:text-xl"
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
