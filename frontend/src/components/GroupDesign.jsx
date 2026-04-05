import React, { useState } from 'react';

const GroupDesign = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    structureType: 'Highway',
    locationMode: 'name', // 'name' or 'custom'
    stateName: '',
    districtName: '',
    span: '',
    carriagewayWidth: '',
    footpath: 'None',
    skewAngle: '',
    girderSteel: 'E250',
    crossBracingSteel: 'E250',
    deckConcrete: 'M25'
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  const isOther = formData.structureType === 'Other';

  const validate = (name, value) => {
    let newErrors = { ...errors };
    let newWarnings = { ...warnings };

    if (name === 'span') {
      const num = parseFloat(value);
      if (value !== '' && (!isNaN(num) && (num < 20 || num > 45))) {
        newErrors.span = 'Outside the software range';
      } else {
        delete newErrors.span;
      }
    }

    if (name === 'carriagewayWidth') {
      const num = parseFloat(value);
      if (value !== '' && (!isNaN(num) && (num < 4.25 || num >= 24))) {
        newErrors.carriagewayWidth = 'Invalid width (must be ≥ 4.25 and < 24)';
      } else {
        delete newErrors.carriagewayWidth;
      }
    }

    if (name === 'skewAngle') {
      const num = parseFloat(value);
      if (value !== '' && (!isNaN(num) && (num < -15 || num > 15))) {
        newWarnings.skewAngle = 'IRC 24 (2010) requires detailed analysis';
      } else {
        delete newWarnings.skewAngle;
      }
    }

    setErrors(newErrors);
    setWarnings(newWarnings);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleLocationModeChange = (mode) => {
    setFormData(prev => ({ ...prev, locationMode: mode }));
  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'basic' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Inputs
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'additional' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('additional')}
        >
          Additional Inputs
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeTab === 'basic' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Type of Structure</h3>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="structureType"
                    value="Highway"
                    checked={formData.structureType === 'Highway'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Highway</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="structureType"
                    value="Other"
                    checked={formData.structureType === 'Other'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Other</span>
                </label>
              </div>
              {isOther && (
                <p className="mt-2 text-sm text-red-600 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Other structures not included
                </p>
              )}
            </section>
            <div className={`space-y-8 transition-all duration-300 ${isOther ? 'opacity-40 pointer-events-none grayscale-[0.5]' : ''}`}>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Project Location</h3>
                <div className="space-y-4">
                  {/* Mode 1 */}
                  <div className="flex flex-col space-y-3 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                    <label className="flex items-center space-x-2 cursor-pointer group w-fit">
                      <input
                        type="checkbox"
                        checked={formData.locationMode === 'name'}
                        onChange={() => handleLocationModeChange('name')}
                        disabled={isOther}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Enter Location Name</span>
                    </label>
                    
                    {formData.locationMode === 'name' && (
                      <div className="grid grid-cols-2 gap-4 pl-6 animate-fade-in-down origin-top">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">State</label>
                          <select 
                            name="stateName"
                            value={formData.stateName}
                            onChange={handleChange}
                            disabled={isOther}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                          >
                            <option value="">Select State...</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">District</label>
                          <select 
                            name="districtName"
                            value={formData.districtName}
                            onChange={handleChange}
                            disabled={isOther}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                          >
                            <option value="">Select District...</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="New Delhi">New Delhi</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mode 2 */}
                  <div className="flex flex-col space-y-3 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                    <label className="flex items-center space-x-2 cursor-pointer group w-fit">
                      <input
                        type="checkbox"
                        checked={formData.locationMode === 'custom'}
                        onChange={() => handleLocationModeChange('custom')}
                        disabled={isOther}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Custom Parameters</span>
                    </label>
                    {formData.locationMode === 'custom' && (
                      <div className="pl-6 animate-fade-in-down origin-top">
                        <button
                          type="button"
                          disabled={isOther}
                          className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 border border-blue-200 transition-colors shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                        >
                          Enter Custom Values
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* C. Geometric Details */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Geometric Details</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {/* Span */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Span (m)
                    </label>
                    <input
                      type="number"
                      name="span"
                      value={formData.span}
                      onChange={handleChange}
                      disabled={isOther}
                      placeholder="Enter span"
                      className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm transition-colors disabled:bg-gray-100 ${
                        errors.span 
                          ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                      }`}
                    />
                    {errors.span && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.span}
                      </p>
                    )}
                  </div>

                  {/* Carriageway Width */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Carriageway Width (m)
                    </label>
                    <input
                      type="number"
                      name="carriagewayWidth"
                      value={formData.carriagewayWidth}
                      onChange={handleChange}
                      disabled={isOther}
                      placeholder="e.g. 7.5"
                      className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm transition-colors disabled:bg-gray-100 ${
                        errors.carriagewayWidth 
                          ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                      }`}
                    />
                    {errors.carriagewayWidth && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.carriagewayWidth}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Footpath
                    </label>
                    <select
                      name="footpath"
                      value={formData.footpath}
                      onChange={handleChange}
                      disabled={isOther}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                    >
                      <option value="None">None</option>
                      <option value="Single-sided">Single-sided</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Skew Angle (degrees)
                    </label>
                    <input
                      type="number"
                      name="skewAngle"
                      value={formData.skewAngle}
                      onChange={handleChange}
                      disabled={isOther}
                      placeholder="Enter angle"
                      className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm transition-colors disabled:bg-gray-100 ${
                        warnings.skewAngle 
                          ? 'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50/30' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                      }`}
                    />
                    {warnings.skewAngle && (
                      <p className="mt-1.5 text-xs text-orange-600 font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {warnings.skewAngle}
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Material Inputs</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Girder Steel
                    </label>
                    <select
                      name="girderSteel"
                      value={formData.girderSteel}
                      onChange={handleChange}
                      disabled={isOther}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                    >
                      <option value="E250">E250</option>
                      <option value="E350">E350</option>
                      <option value="E450">E450</option>
                    </select>
                  </div>

                  {/* Cross Bracing Steel */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Cross Bracing Steel
                    </label>
                    <select
                      name="crossBracingSteel"
                      value={formData.crossBracingSteel}
                      onChange={handleChange}
                      disabled={isOther}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                    >
                      <option value="E250">E250</option>
                      <option value="E350">E350</option>
                      <option value="E450">E450</option>
                    </select>
                  </div>

                  {/* Deck Concrete */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Deck Concrete
                    </label>
                    <select
                      name="deckConcrete"
                      value={formData.deckConcrete}
                      onChange={handleChange}
                      disabled={isOther}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-gray-100 transition-colors"
                    >
                      {['M25', 'M30', 'M35', 'M40', 'M45', 'M50', 'M55', 'M60'].map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

            </div>
          </div>
        )}

        {/* Placeholder for Additional Inputs */}
        {activeTab === 'additional' && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <p className="font-medium text-gray-500">Additional configurations</p>
            <p className="text-sm">Available in advanced mode</p>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default GroupDesign;
