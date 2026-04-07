import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Tabs from '../components/layout/Tabs';
import { BasicInputs } from '../components/form/BasicInputs';
import { AdditionalInputs } from '../components/form/AdditionalInputs';
import { GeometryPopup } from '../components/modal/GeometryPopup';
import BridgeDiagram from '../components/visualization/BridgeDiagram';
import { useFormValidation } from '../hooks/useFormValidation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

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
  customZoneFactor: '',
  wind: '',
  seismic: '',
  zoneFactor: '',
  tempMax: '',
  tempMin: '',
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(initialFormData);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [statesError, setStatesError] = useState('');
  const [districtsError, setDistrictsError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [isGeometryPopupOpen, setIsGeometryPopupOpen] = useState(false);
  const [isCustomLocationModalOpen, setIsCustomLocationModalOpen] = useState(false);
  const { errors, warnings, validateField } = useFormValidation();

  const isOther = formData.structureType === 'Other';

  useEffect(() => {
    const fetchStates = async () => {
      setStatesLoading(true);
      setStatesError('');
      try {
        const response = await fetch(`${API_BASE_URL}/api/states/`);
        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }
        const data = await response.json();
        setStates(Array.isArray(data) ? data : []);
      } catch (error) {
        setStates([]);
        setStatesError('Unable to load states. Please check backend server.');
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!formData.stateName) {
      setDistricts([]);
      setDistrictsError('');
      return;
    }

    const fetchDistricts = async () => {
      setDistrictsLoading(true);
      setDistrictsError('');
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/districts/${encodeURIComponent(formData.stateName)}/`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }
        const data = await response.json();
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        setDistricts([]);
        setDistrictsError('Unable to load districts for selected state.');
      } finally {
        setDistrictsLoading(false);
      }
    };

    fetchDistricts();
  }, [formData.stateName]);

  useEffect(() => {
    if (formData.locationMode !== 'name' || !formData.stateName || !formData.districtName) {
      setLocationError('');
      return;
    }

    const fetchLocationData = async () => {
      setLocationLoading(true);
      setLocationError('');
      try {
        const url = new URL(`${API_BASE_URL}/api/data/`);
        url.searchParams.set('state', formData.stateName);
        url.searchParams.set('district', formData.districtName);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          wind: `${data.wind} m/s`,
          seismic: `Zone ${data.seismic_zone}`,
          zoneFactor: `${data.zone_factor}`,
          tempMax: `${data.temp_max} C`,
          tempMin: `${data.temp_min} C`,
        }));
      } catch (error) {
        setFormData((prev) => ({
          ...prev,
          wind: '',
          seismic: '',
          zoneFactor: '',
          tempMax: '',
          tempMin: '',
        }));
        setLocationError('Unable to load location climate/seismic data.');
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocationData();
  }, [formData.stateName, formData.districtName, formData.locationMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'stateName') {
        next.districtName = '';
        if (next.locationMode === 'name') {
          next.wind = '';
          next.seismic = '';
          next.zoneFactor = '';
          next.tempMax = '';
          next.tempMin = '';
        }
      }

      if (name === 'districtName' && next.locationMode === 'name') {
        next.wind = '';
        next.seismic = '';
        next.zoneFactor = '';
        next.tempMax = '';
        next.tempMin = '';
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
      zoneFactor: prev.customZoneFactor,
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
    zoneFactor: formData.zoneFactor,
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
          statesLoading={statesLoading}
          districtsLoading={districtsLoading}
          locationLoading={locationLoading}
          statesError={statesError}
          districtsError={districtsError}
          locationError={locationError}
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
