import React from 'react';
import { ProjectLocation } from './ProjectLocation';
import { GeometricInputs } from './GeometricInputs';
import { MaterialInputs } from './MaterialInputs';
import { StyledSelect } from '../ui/StyledSelect';

export const BasicInputs = ({
  formData,
  handleChange,
  handleLocationModeChange,
  errors,
  warnings,
  isOther,
  onOpenGeometryModal,
  isLocationModalOpen,
  onOpenLocationModal,
  onCloseLocationModal,
  isCustomLocationModalOpen,
  onOpenCustomLocationModal,
  onCloseCustomLocationModal,
  onApplyCustomLocation,
  locationSummary,
  states,
  districts,
  statesLoading,
  districtsLoading,
  locationLoading,
  statesError,
  districtsError,
  locationError,
}) => {
  return (
    <div className="space-y-3 animate-fade-in-down">
      <section className="mb-4 rounded-none border border-black bg-white shadow-md">
        <div className="border-b border-black bg-gray-100 px-3 py-1.5">
          <h3 className="text-[12px] font-bold text-gray-900">Type of Structure</h3>
        </div>
        <div className="p-3">
          <StyledSelect
            name="structureType"
            value={formData.structureType}
            onChange={handleChange}
            options={[
              { value: 'Highway', label: 'Highway' },
              { value: 'Other', label: 'Other' }
            ]}
          />
          {isOther && (
            <div className="mt-3 flex items-center border border-red-300 bg-red-50 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-[11px] text-red-700 font-bold uppercase tracking-wider">
                Other structures not included
              </p>
            </div>
          )}
        </div>
      </section>

      <div className={`space-y-3 transition-all duration-300 ${isOther ? 'opacity-40 pointer-events-none grayscale-[0.3]' : ''}`}>
        <div className="mb-4">
          <button
            type="button"
            onClick={onOpenLocationModal}
            disabled={isOther}
            className="w-full bg-amber-400 border border-black px-3 py-2 text-[12px] font-bold text-gray-900 text-left hover:bg-amber-300 transition-colors shadow-sm disabled:opacity-50 disabled:grayscale"
          >
            Project Location
          </button>
        </div>

        <ProjectLocation 
          isOpen={isLocationModalOpen}
          onClose={onCloseLocationModal}
          formData={formData}
          handleChange={handleChange}
          handleLocationModeChange={handleLocationModeChange}
          isOther={isOther}
          isCustomLocationModalOpen={isCustomLocationModalOpen}
          onOpenCustomLocationModal={onOpenCustomLocationModal}
          onCloseCustomLocationModal={onCloseCustomLocationModal}
          onApplyCustomLocation={onApplyCustomLocation}
          locationSummary={locationSummary}
          states={states}
          districts={districts}
          statesLoading={statesLoading}
          districtsLoading={districtsLoading}
          locationLoading={locationLoading}
          statesError={statesError}
          districtsError={districtsError}
          locationError={locationError}
        />

        <GeometricInputs 
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          warnings={warnings}
          isOther={isOther}
          onOpenGeometryModal={onOpenGeometryModal}
        />

        <MaterialInputs 
          formData={formData}
          handleChange={handleChange}
          isOther={isOther}
        />
      </div>
    </div>
  );
};
