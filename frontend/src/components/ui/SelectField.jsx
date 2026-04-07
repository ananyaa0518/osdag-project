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
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-black bg-white px-3 py-2 pr-10 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-4 -translate-y-1/2 bg-[#3d6ebf]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
        />
      </div>
    </div>
  );
};

export default SelectField;
