import React from 'react';

interface LoadingScreenProps {
  message?: string; // Optional loading message
  className?: string; // Custom class for styling
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...', className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gray-100 ${className}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-gray-700 text-lg">{message}</p>
    </div>
  );
};

export default LoadingScreen;
