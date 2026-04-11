import React, { useState, useRef, useEffect } from 'react';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'Select',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (disabled) return;

    if (!isOpen) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      if (spaceBelow < 200) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
    
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: option.value,
        },
      });
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className={`w-full cursor-pointer rounded-lg border border-black bg-white px-3 py-2 pr-10 text-sm shadow-sm outline-none transition ${
            isOpen ? 'border-blue-500 ring-1 ring-blue-500' : ''
          } ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500 opacity-70' : 'hover:border-gray-400'}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-4 -translate-y-1/2 bg-[#3d6ebf]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
        />

        {isOpen && (
          <div className={`absolute left-0 w-full bg-white border border-gray-600 z-[999] shadow-xl max-h-60 overflow-y-auto rounded-md ${
            openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}>
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  opt.value === value 
                    ? 'bg-gray-300 font-bold text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
