import React from 'react';


const Toggle = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? 'bg-green-500' : 'bg-gray-400'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
