import React, { useState, useRef, useEffect } from 'react';

export const StyledSelect = ({ label, options, className = '', ...props }) => {
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
    if (props.disabled) return;
    
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
    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: option.value,
        },
      });
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === props.value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className={`w-full cursor-pointer border border-black bg-white px-2 py-1.5 pr-10 text-[11px] shadow-sm transition-colors ${
            isOpen ? 'border-blue-500 ring-1 ring-blue-500' : ''
          } ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'hover:border-gray-400'} ${props.className || ''}`}
        >
          {selectedOption ? selectedOption.label : 'Select...'}
        </div>
        
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 h-5 w-4 -translate-y-1/2 bg-[#3d6ebf]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
        />

        {isOpen && (
          <div className={`absolute left-0 w-full bg-white border border-gray-600 z-[999] shadow-xl max-h-60 overflow-y-auto ${
            openUpward ? 'bottom-full mb-px' : 'top-full mt-px'
          }`}>
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleSelect(opt)}
                className={`px-3 py-2 text-[11px] cursor-pointer transition-colors ${
                  opt.value === props.value 
                    ? 'bg-gray-300 font-bold text-gray-900 border-l-4 border-blue-600' 
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
