import React from 'react';

export const StyledSelect = ({ label, options, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">{label}</label>}
      <div className="relative">
        <select
          {...props}
          className={`w-full appearance-none border border-black bg-white px-2 py-1.5 pr-10 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 ${props.className || ''}`}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 h-5 w-4 -translate-y-1/2 bg-[#3d6ebf]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
        />
      </div>
    </div>
  );
};
