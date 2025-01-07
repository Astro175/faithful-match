import React from 'react';


const Button = ({ label, onClick, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
