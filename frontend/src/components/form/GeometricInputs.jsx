import React from 'react';
import { StyledInput } from '../ui/StyledInput';
import { StyledSelect } from '../ui/StyledSelect';

export const GeometricInputs = ({ formData, handleChange, errors, warnings, isOther, onOpenGeometryModal }) => {
  return (
    <section className="mb-4 rounded-none border border-black bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-black bg-gray-100 px-3 py-1.5">
        <h3 className="text-[12px] font-bold text-gray-900">Geometric Details</h3>
        <button 
          type="button" 
          onClick={onOpenGeometryModal}
          disabled={isOther || !formData.carriagewayWidth || isNaN(parseFloat(formData.carriagewayWidth))}
          className="border border-amber-600 bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400"
        >
          Modify Additional Geometry
        </button>
      </div>
      
      <div className="space-y-3 p-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <StyledInput
            label="Span (m)"
            name="span"
            type="number"
            value={formData.span}
            onChange={handleChange}
            disabled={isOther}
            placeholder="Enter span"
            error={errors.span}
          />

          <StyledInput
            label="Carriageway Width (m)"
            name="carriagewayWidth"
            type="number"
            value={formData.carriagewayWidth}
            onChange={handleChange}
            disabled={isOther}
            placeholder="e.g. 7.5"
            error={errors.carriagewayWidth}
          />
          
          <StyledSelect
            label="Footpath"
            name="footpath"
            value={formData.footpath}
            onChange={handleChange}
            disabled={isOther}
            options={[
              { value: 'None', label: 'None' },
              { value: 'Single-sided', label: 'Single-sided' },
              { value: 'Both', label: 'Both' }
            ]}
          />

          <StyledInput
            label="Skew Angle (degrees)"
            name="skewAngle"
            type="number"
            value={formData.skewAngle}
            onChange={handleChange}
            disabled={isOther}
            placeholder="Enter angle"
            warning={warnings.skewAngle}
          />
        </div>

        <div className="border-t border-black pt-2">
          {!formData.carriagewayWidth && !isOther && (
            <p className="mt-1 text-[10px] text-gray-500">Please enter a valid carriageway width to unlock advanced geometry.</p>
          )}
          {formData.spacing && (
            <div className="mt-2 grid grid-cols-4 gap-2 items-center border border-gray-200 bg-gray-50 p-2 text-[10px] text-gray-700">
              <div className="flex items-center font-bold text-[#84cc16] min-w-0">
                <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">Applied Geometry</span>
              </div>
              <div className="min-w-0 text-center">
                <span className="block text-[8px] font-bold uppercase text-gray-500">Spacing</span>
                <span className="font-semibold text-gray-900">{formData.spacing} m</span>
              </div>
              <div className="min-w-0 text-center">
                <span className="block text-[8px] font-bold uppercase text-gray-500">Girders</span>
                <span className="font-semibold text-gray-900">{formData.girders}</span>
              </div>
              <div className="min-w-0 text-center break-words">
                <span className="block text-[8px] font-bold uppercase text-gray-500">Overhang</span>
                <span className="font-semibold text-gray-900">{formData.overhang} m</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
