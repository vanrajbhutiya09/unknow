import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  fullScreen = false,
  text = 'Loading...',
  showText = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
    xlarge: 'w-24 h-24 border-4'
  };

  const colorClasses = {
    primary: 'border-t-purple-600',
    secondary: 'border-t-blue-600',
    success: 'border-t-green-600',
    danger: 'border-t-red-600',
    warning: 'border-t-yellow-600',
    light: 'border-t-gray-200',
    dark: 'border-t-gray-800'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} border-gray-300 ${colorClasses[color]} rounded-full animate-spin`}></div>
      {showText && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

// Variants for different use cases
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <LoadingSpinner size="large" text="Loading application..." />
  </div>
);

export const ContentLoader = () => (
  <div className="py-12 flex items-center justify-center">
    <LoadingSpinner size="medium" text="Loading content..." />
  </div>
);

export const ButtonLoader = ({ color = 'white' }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 border-2 border-${color} border-t-transparent rounded-full animate-spin`}></div>
    <span>Loading...</span>
  </div>
);

export const TableLoader = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export const CardLoader = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

export const SkeletonLoader = ({ type = 'text', count = 1, className = '' }) => {
  const baseClass = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200';
  
  const types = {
    text: `h-4 rounded ${className}`,
    title: `h-6 rounded w-3/4 ${className}`,
    avatar: `rounded-full ${className}`,
    button: `h-10 rounded ${className}`,
    card: `rounded-xl ${className}`,
    image: `rounded-lg ${className}`
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${baseClass} ${types[type]}`}></div>
      ))}
    </div>
  );
};

export default LoadingSpinner;