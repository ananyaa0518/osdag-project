import React from 'react';
import { ProjectLocation } from './ProjectLocation';
import { GeometricInputs } from './GeometricInputs';
import { MaterialInputs } from './MaterialInputs';

export const BasicInputs = ({
  formData,
  handleChange,
  handleLocationModeChange,
  errors,
  warnings,
  isOther,
  onOpenGeometryModal,
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
      {/* Type of Structure */}
      <section className="mb-4 overflow-hidden rounded-none border border-black bg-white shadow-md">
        <div className="border-b border-black bg-white px-3 py-1.5">
          <h3 className="text-[12px] font-semibold text-gray-900">Type of Structure</h3>
        </div>
        <div className="p-3">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2.5 cursor-pointer group">
              <input
                type="radio"
                name="structureType"
                value="Highway"
                checked={formData.structureType === 'Highway'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Highway</span>
            </label>
            <label className="flex items-center space-x-2.5 cursor-pointer group">
              <input
                type="radio"
                name="structureType"
                value="Other"
                checked={formData.structureType === 'Other'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Other</span>
            </label>
          </div>
          {isOther && (
            <div className="mt-3 flex items-center border border-red-200 bg-red-50 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-red-700 font-medium tracking-wide">
                Other structures not included
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sub-components container wrapped in disabled visually styling */}
      <div className={`space-y-3 transition-all duration-300 ${isOther ? 'opacity-40 pointer-events-none grayscale-[0.3]' : ''}`}>
        <ProjectLocation 
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
