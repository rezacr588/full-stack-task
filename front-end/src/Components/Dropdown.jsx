import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: selected,
    value: selected,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block"

    >
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center gap-2"
        onClick={toggleDropdown}
        style={{
          background: "rgba(47, 128, 237, 0.25)",
          borderRadius: "18px",
          color: "rgba(47, 128, 237, 1)",
          lineHeight: "15px",
          fontSize: "10px",
        }}
      >
        {selectedOption ? selectedOption.label : 'Select a category'}
        <span className="float-right">
          <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.19006 4.81017L0.486338 1.10645C0.233219 0.853329 0.233219 0.442942 0.486338 0.189823C0.739456 -0.0632953 1.14984 -0.0632953 1.40296 0.189824L4.64837 3.43523L7.89378 0.189824C8.1469 -0.063295 8.55729 -0.063295 8.81041 0.189824C9.06352 0.442943 9.06352 0.853329 8.8104 1.10645L5.10668 4.81017C4.85356 5.06329 4.44318 5.06329 4.19006 4.81017Z" fill="#2F80ED"/>
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border rounded shadow">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
