const BridgeDiagram = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="w-full max-w-[920px] border border-[#84cc16] bg-[#84cc16] px-3 py-2 text-left text-sm font-semibold text-slate-900">
        BRIDGE CROSS SECTION (For Nomenclature only)
      </div>
      <img
        src="/bridge-section.png"
        alt="Bridge cross-section reference"
        className="max-h-[80%] max-w-full object-contain"
      />
    </div>
  );
};

export default BridgeDiagram;
