const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  error,
  warning,
  className = '',
}) => {
  const borderClass = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
    : warning
      ? 'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50/40'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white';

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition ${borderClass} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500`}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
      {!error && warning && <p className="mt-1.5 text-xs font-medium text-yellow-500">{warning}</p>}
    </div>
  );
};

export default InputField;
