const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-4 flex gap-2">
      <button
        type="button"
        onClick={() => onTabChange('basic')}
        className={`border px-3 py-2 text-sm font-semibold transition ${
          activeTab === 'basic'
            ? 'border-lime-700 bg-lime-500 text-slate-900'
            : 'border-gray-300 bg-gray-100 text-slate-700'
        }`}
      >
        Basic Inputs
      </button>
      <button
        type="button"
        onClick={() => onTabChange('additional')}
        className={`border px-3 py-2 text-sm font-semibold transition ${
          activeTab === 'additional'
            ? 'border-lime-700 bg-lime-500 text-slate-900'
            : 'border-gray-300 bg-gray-100 text-slate-700'
        }`}
      >
        Additional Inputs
      </button>
    </div>
  );
};

export default Tabs;
