import React from 'react';

export default function UniversalSpinner({ size = 'md', text = null, className = "" }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-14 w-14 border-t-4 border-b-4',
    xl: 'h-16 w-16 border-t-4 border-b-4'
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-black border-t-transparent`}></div>
      {text && (
        <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
}
