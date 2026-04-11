import React from 'react';
import { StyledSelect } from '../ui/StyledSelect';
import Modal from '../ui/Modal';

export const ProjectLocation = ({
  isOpen,
  onClose,
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
  statesLoading,
  districtsLoading,
  locationLoading,
  statesError,
  districtsError,
  locationError,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="w-[500px] bg-white border rounded shadow-lg p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black text-xl font-bold"
          type="button"
        >
          &times;
        </button>

        {/* Header */}
        <div className="bg-yellow-400 font-semibold px-3 py-2 border mb-4">
          Project Location
        </div>
        
        <div className="space-y-4">
          {/* Radio 1: Enter Location Name */}
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
              <span className={`text-xs font-semibold tracking-wide transition-colors ${isOther ? 'text-gray-400' : 'text-gray-700 group-hover:text-blue-600'}`}>
                Enter Location Name
              </span>
            </label>
            
            {/* Dropdown Row */}
            <div className="animate-fade-in-down origin-top pl-2">
              <div className="grid grid-cols-2 gap-3">
                <StyledSelect
                  label="STATE"
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleChange}
                  disabled={isOther || statesLoading || formData.locationMode !== 'name'}
                  options={[
                    { value: '', label: statesLoading ? 'Loading states...' : 'Select State...' },
                    ...states.map((state) => ({ value: state, label: state })),
                  ]}
                />
                <StyledSelect
                  label="DISTRICT"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleChange}
                  disabled={isOther || !formData.stateName || districtsLoading || formData.locationMode !== 'name'}
                  options={[
                    { value: '', label: districtsLoading ? 'Loading districts...' : 'Select District...' },
                    ...districts.map((district) => ({ value: district, label: district })),
                  ]}
                />
              </div>
              {formData.locationMode === 'name' && (
                <>
                  {(statesError || districtsError) && (
                    <p className="mt-2 text-[10px] font-medium text-red-600">
                      {statesError || districtsError}
                    </p>
                  )}
                  {locationLoading && (
                    <p className="mt-2 text-[10px] font-medium text-slate-600">Loading location data...</p>
                  )}
                  {locationError && (
                    <p className="mt-2 text-[10px] font-medium text-red-600">{locationError}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Radio 2: Custom Input */}
          <div className="flex flex-col space-y-2 border-t pt-2">
            <label className="flex items-center space-x-2 cursor-pointer group w-fit">
              <input
                type="radio"
                name="locationMode"
                checked={formData.locationMode === 'custom'}
                onChange={() => handleLocationModeChange('custom')}
                disabled={isOther}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className={`text-xs font-semibold tracking-wide transition-colors ${isOther ? 'text-gray-400' : 'text-gray-700 group-hover:text-blue-600'}`}>
                Custom Input
              </span>
            </label>
            {formData.locationMode === 'custom' && (
              <div className="pl-6 animate-fade-in-down origin-top">
                <button
                  type="button"
                  onClick={onOpenCustomLocationModal}
                  disabled={isOther}
                  className="border border-amber-600 bg-amber-400 px-3 py-1 text-[11px] font-semibold text-gray-900 transition-colors hover:bg-amber-300 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400 rounded-sm"
                >
                  Edit Custom Values
                </button>
              </div>
            )}
          </div>

          {/* Green Box */}
          <div className="border border-green-400 bg-green-50 p-3 mt-3 grid grid-cols-5 text-green-600 font-semibold shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-tighter opacity-70">WIND</span>
              <span className="text-[11px]">{locationSummary.wind || '-'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-tighter opacity-70">SEISMIC</span>
              <span className="text-[11px]">{locationSummary.seismic || '-'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-tighter opacity-70">ZONE FACTOR</span>
              <span className="text-[11px]">{locationSummary.zoneFactor || '-'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-tighter opacity-70">MAX TEMP</span>
              <span className="text-[11px]">{locationSummary.tempMax || '-'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-tighter opacity-70">MIN TEMP</span>
              <span className="text-[11px]">{locationSummary.tempMin || '-'}</span>
            </div>
          </div>
        </div>

        {/* Custom Parameters Modal (Nested) */}
        {/* Custom Parameters Modal (Nested) */}
        {isCustomLocationModalOpen && (
          <div 
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]"
            onClick={onCloseCustomLocationModal}
          >
            <div 
              className="w-[500px] bg-white border rounded shadow-lg p-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={onCloseCustomLocationModal}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black text-xl font-bold"
                type="button"
              >
                &times;
              </button>

              {/* Header */}
              <div className="bg-yellow-400 font-semibold px-3 py-2 border mb-4">
                Custom Location Parameters
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Wind Speed</label>
                  <input
                    name="customWind"
                    type="text"
                    value={formData.customWind}
                    onChange={handleChange}
                    className="w-full border border-black bg-white px-2 py-1.5 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. 44 m/s"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Seismic Zone</label>
                  <input
                    name="customSeismic"
                    type="text"
                    value={formData.customSeismic}
                    onChange={handleChange}
                    className="w-full border border-black bg-white px-2 py-1.5 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. Zone III"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Max Temperature</label>
                  <input
                    name="customTempMax"
                    type="text"
                    value={formData.customTempMax}
                    onChange={handleChange}
                    className="w-full border border-black bg-white px-2 py-1.5 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. 40 C"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Min Temperature</label>
                  <input
                    name="customTempMin"
                    type="text"
                    value={formData.customTempMin}
                    onChange={handleChange}
                    className="w-full border border-black bg-white px-2 py-1.5 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. 8 C"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Zone Factor</label>
                  <input
                    name="customZoneFactor"
                    type="text"
                    value={formData.customZoneFactor}
                    onChange={handleChange}
                    className="w-full border border-black bg-white px-2 py-1.5 text-[11px] shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. 0.16"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onApplyCustomLocation}
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors uppercase tracking-widest"
                >
                  Apply Values
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
