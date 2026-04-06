import React from 'react';

export const StyledSelect = ({ label, options, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">{label}</label>}
      <select
        {...props}
        className={`w-full border border-gray-300 px-2 py-1.5 text-[11px] focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors ${props.className || ''}`}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
