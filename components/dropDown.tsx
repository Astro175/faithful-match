import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="relative inline-block">
      <button className="bg-gray-200 px-4 py-2 rounded">{selected || 'Select an option'}</button>
      <ul className="absolute bg-white border rounded mt-1 shadow">
        {options.map((option) => (
          <li
            key={option}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
