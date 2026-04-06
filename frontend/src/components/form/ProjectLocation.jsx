import React from 'react';
import { StyledSelect } from '../ui/StyledSelect';
import Modal from '../ui/Modal';

export const ProjectLocation = ({
  formData,
  handleChange,
  handleLocationModeChange,
  isOther,
  isCustomLocationModalOpen,
  onOpenCustomLocationModal,
  onCloseCustomLocationModal,
  onApplyCustomLocation,
  locationSummary,
  states,
  districts,
}) => {
  return (
    <section className="mb-4 overflow-hidden rounded-xl bg-white shadow-md">
      <div className="border-b border-gray-300 bg-amber-400 px-3 py-1.5">
        <h3 className="text-[12px] font-bold text-gray-900">Project Location</h3>
      </div>
      
      <div className="space-y-3 p-3">
        {/* Mode 1 */}
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer group w-fit">
            <input
              type="radio"
              name="locationMode"
              checked={formData.locationMode === 'name'}
              onChange={() => handleLocationModeChange('name')}
              disabled={isOther}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
            />
            <span className={`text-xs font-medium transition-colors ${isOther ? 'text-gray-400' : 'text-gray-700 group-hover:text-blue-600'}`}>
              Enter Location Name
            </span>
          </label>
          
          {formData.locationMode === 'name' && (
            <div className="animate-fade-in-down origin-top pl-3">
              <div className="grid grid-cols-2 gap-3">
                <StyledSelect
                  label="State"
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleChange}
                  disabled={isOther}
                  options={[
                    { value: '', label: 'Select State...' },
                    ...states.map((state) => ({ value: state, label: state })),
                  ]}
                />
                <StyledSelect
                  label="District"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleChange}
                  disabled={isOther || !formData.stateName}
                  options={[
                    { value: '', label: 'Select District...' },
                    ...districts.map((district) => ({ value: district, label: district })),
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mode 2 */}
        <div className="flex flex-col space-y-2 border-t border-gray-200 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer group w-fit">
            <input
              type="radio"
              name="locationMode"
              checked={formData.locationMode === 'custom'}
              onChange={() => handleLocationModeChange('custom')}
              disabled={isOther}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
            />
            <span className={`text-xs font-medium transition-colors ${isOther ? 'text-gray-400' : 'text-gray-700 group-hover:text-blue-600'}`}>
              Custom Input
            </span>
          </label>
          {formData.locationMode === 'custom' && (
            <div className="pl-6 animate-fade-in-down origin-top">
              <button
                type="button"
                onClick={onOpenCustomLocationModal}
                disabled={isOther}
                className="border border-amber-600 bg-amber-400 px-3 py-1 text-[11px] font-semibold text-gray-900 transition-colors hover:bg-amber-300 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
              >
                Open Custom Values
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 border border-green-300 bg-green-50 p-2 text-[11px] md:grid-cols-4">
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">Wind</span>
            <span className="text-xs font-medium text-green-600">{locationSummary.wind || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">Seismic</span>
            <span className="text-xs font-medium text-green-600">{locationSummary.seismic || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">Max Temp</span>
            <span className="text-xs font-medium text-green-600">{locationSummary.tempMax || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">Min Temp</span>
            <span className="text-xs font-medium text-green-600">{locationSummary.tempMin || '-'}</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCustomLocationModalOpen}
        title="Custom Location Parameters"
        onClose={onCloseCustomLocationModal}
        maxWidth="max-w-3xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Wind Speed</label>
            <input
              name="customWind"
              type="text"
              value={formData.customWind}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 44 m/s"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Seismic Zone</label>
            <input
              name="customSeismic"
              type="text"
              value={formData.customSeismic}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Zone III"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Temperature</label>
            <input
              name="customTempMax"
              type="text"
              value={formData.customTempMax}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 40 C"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Temperature</label>
            <input
              name="customTempMin"
              type="text"
              value={formData.customTempMin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 8 C"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onApplyCustomLocation}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700"
          >
            Apply Values
          </button>
        </div>
      </Modal>
    </section>
  );
};
