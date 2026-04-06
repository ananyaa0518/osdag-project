import React, { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout';
import Tabs from '../components/layout/Tabs';
import { BasicInputs } from '../components/form/BasicInputs';
import { AdditionalInputs } from '../components/form/AdditionalInputs';
import { GeometryPopup } from '../components/modal/GeometryPopup';
import BridgeDiagram from '../components/visualization/BridgeDiagram';
import { locationData } from '../data/locationData';
import { useFormValidation } from '../hooks/useFormValidation';

const initialFormData = {
  structureType: 'Highway',
  locationMode: 'name',
  stateName: '',
  districtName: '',
  span: '',
  carriagewayWidth: '',
  footpath: 'None',
  skewAngle: '',
  girderSteel: 'E250',
  crossBracingSteel: 'E250',
  deckConcrete: 'M25',
  spacing: '',
  girders: '',
  overhang: '',
  customWind: '',
  customSeismic: '',
  customTempMax: '',
  customTempMin: '',
  wind: '',
  seismic: '',
  tempMax: '',
  tempMin: '',
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(initialFormData);
  const [isGeometryPopupOpen, setIsGeometryPopupOpen] = useState(false);
  const [isCustomLocationModalOpen, setIsCustomLocationModalOpen] = useState(false);
  const { errors, warnings, validateField } = useFormValidation();

  const isOther = formData.structureType === 'Other';

  const states = useMemo(
    () => [...new Set(locationData.map((item) => item.state))],
    [],
  );

  const districts = useMemo(() => {
    if (!formData.stateName) {
      return [];
    }

    return locationData
      .filter((item) => item.state === formData.stateName)
      .map((item) => item.district);
  }, [formData.stateName]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'stateName') {
        next.districtName = '';
        if (next.locationMode === 'name') {
          next.wind = '';
          next.seismic = '';
          next.tempMax = '';
          next.tempMin = '';
        }
      }

      if (name === 'districtName' && next.locationMode === 'name') {
        const matched = locationData.find((row) => row.district === value && row.state === next.stateName);
        if (matched) {
          next.wind = matched.windSpeed;
          next.seismic = matched.seismicZone;
          next.tempMax = matched.tempMax;
          next.tempMin = matched.tempMin;
        }
      }

      return next;
    });

    validateField(name, value);
  };

  const handleLocationModeChange = (mode) => {
    setFormData((prev) => ({ ...prev, locationMode: mode }));
  };

  const handleApplyCustomLocation = () => {
    setFormData((prev) => ({
      ...prev,
      wind: prev.customWind,
      seismic: prev.customSeismic,
      tempMax: prev.customTempMax,
      tempMin: prev.customTempMin,
    }));
    setIsCustomLocationModalOpen(false);
  };

  const handleApplyGeometry = ({ spacing, girders, overhang }) => {
    setFormData((prev) => ({
      ...prev,
      spacing: spacing.toString(),
      girders: girders.toString(),
      overhang: overhang.toString(),
    }));
  };

  const locationSummary = {
    wind: formData.wind,
    seismic: formData.seismic,
    tempMax: formData.tempMax,
    tempMin: formData.tempMin,
  };

  const overallWidth = Number.parseFloat(formData.carriagewayWidth || '0') + 5;

  const leftPanel = (
    <div>
      <h1 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-700">Basic Input Module</h1>
      <p className="mb-3 text-[11px] text-slate-500">OSDAG composite bridge quick screening</p>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'basic' ? (
        <BasicInputs
          formData={formData}
          handleChange={handleChange}
          handleLocationModeChange={handleLocationModeChange}
          errors={errors}
          warnings={warnings}
          isOther={isOther}
          onOpenGeometryModal={() => setIsGeometryPopupOpen(true)}
          isCustomLocationModalOpen={isCustomLocationModalOpen}
          onOpenCustomLocationModal={() => setIsCustomLocationModalOpen(true)}
          onCloseCustomLocationModal={() => setIsCustomLocationModalOpen(false)}
          onApplyCustomLocation={handleApplyCustomLocation}
          locationSummary={locationSummary}
          states={states}
          districts={districts}
        />
      ) : (
        <AdditionalInputs />
      )}

      <GeometryPopup
        isOpen={isGeometryPopupOpen}
        onClose={() => setIsGeometryPopupOpen(false)}
        onApply={handleApplyGeometry}
        overallWidth={overallWidth}
      />
    </div>
  );

  const rightPanel = (
    <BridgeDiagram
      carriagewayWidth={formData.carriagewayWidth}
      structureType={formData.structureType}
      locationMode={formData.locationMode}
      locationSummary={locationSummary}
    />
  );

  return <Layout leftPanel={leftPanel} rightPanel={rightPanel} />;
};

export default Home;
