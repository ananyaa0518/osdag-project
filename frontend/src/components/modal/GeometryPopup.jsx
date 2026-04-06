import React from 'react';
import { useGeometryLogic } from '../../hooks/useGeometryLogic';
import { StyledInput } from '../ui/StyledInput';

export const GeometryPopup = ({ isOpen, onClose, onApply, overallWidth }) => {
  const {
    spacing, handleSpacingChange,
    girders, handleGirdersChange,
    overhang, handleOverhangChange,
    sNum, nNum, oNum,
    isSpacingValid, isOverhangValid, isGirdersValid,
    calculatedN, isMatch, isValid
  } = useGeometryLogic(overallWidth);

  if (!isOpen) return null;

  const handleApply = () => {
    if (isValid) {
      onApply({ spacing: sNum, girders: nNum, overhang: oNum });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Modify Additional Geometry</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="text-sm text-blue-800 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between shadow-sm">
            <span className="font-semibold">Overall Width (W): </span> 
            <span className="font-mono text-base">{overallWidth?.toFixed(2)} m</span>
          </div>

          <div className="space-y-4">
            <StyledInput
              label="Overhang Width (O) [meters]"
              type="number" step="0.1"
              value={overhang}
              onChange={handleOverhangChange}
              placeholder="e.g. 1.2"
              error={!isNaN(oNum) && !isOverhangValid ? 'Must be less than overall width' : null}
            />
            <StyledInput
              label="Girder Spacing (S) [meters]"
              type="number" step="0.1"
              value={spacing}
              onChange={handleSpacingChange}
              placeholder="e.g. 2.5"
              error={!isNaN(sNum) && !isSpacingValid ? 'Must be greater than 0 and less than overall width' : null}
            />
            <StyledInput
              label="Number of Girders (N)"
              type="number" step="1"
              value={girders}
              onChange={handleGirdersChange}
              placeholder="e.g. 4"
              error={!isNaN(nNum) && !isGirdersValid ? 'Must be a positive integer less than overall width' : null}
            />
          </div>

          <div className={`p-4 rounded-lg border shadow-sm transition-colors ${calculatedN !== null ? (isMatch ? 'bg-green-50/80 border-green-200' : 'bg-red-50/80 border-red-200') : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Calculation Check: (W - O) / S = N</p>
            {calculatedN !== null ? (
               <div className={`text-sm font-semibold font-mono flex flex-col space-y-1 ${isMatch ? 'text-green-700' : 'text-red-700'}`}>
                 <div>({overallWidth} - {oNum}) / {sNum} = {calculatedN.toFixed(3)}</div>
                 <div className="flex items-center text-sm pt-1">
                   {isMatch ? (
                     <><svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Matches N ({nNum})</>
                   ) : (
                     <><svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> Mismatch! N is {nNum}</>
                   )}
                 </div>
               </div>
            ) : (
               <div className="text-sm text-gray-500 italic">Enter valid spacing and overhang to check formula</div>
            )}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            disabled={!isValid}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
