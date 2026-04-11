import React from 'react';
import { StyledSelect } from '../ui/StyledSelect';

export const MaterialInputs = ({ formData, handleChange, isOther }) => {
  return (
    <section className="mb-4 rounded-none border border-black bg-white shadow-md">
      <div className="border-b border-black bg-gray-100 px-3 py-1.5">
        <h3 className="text-[12px] font-bold text-gray-900">Material Inputs</h3>
      </div>
      
      <div className="p-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <StyledSelect
            label="Girder Steel"
            name="girderSteel"
            value={formData.girderSteel}
            onChange={handleChange}
            disabled={isOther}
            options={[
              { value: 'E250', label: 'E250' },
              { value: 'E350', label: 'E350' },
              { value: 'E450', label: 'E450' }
            ]}
          />

          <StyledSelect
            label="Cross Bracing Steel"
            name="crossBracingSteel"
            value={formData.crossBracingSteel}
            onChange={handleChange}
            disabled={isOther}
            options={[
              { value: 'E250', label: 'E250' },
              { value: 'E350', label: 'E350' },
              { value: 'E450', label: 'E450' }
            ]}
          />

          <StyledSelect
            label="Deck Concrete"
            name="deckConcrete"
            value={formData.deckConcrete}
            onChange={handleChange}
            disabled={isOther}
            options={['M25', 'M30', 'M35', 'M40', 'M45', 'M50', 'M55', 'M60'].map(grade => ({
              value: grade, label: grade
            }))}
          />
        </div>
      </div>
    </section>
  );
};
