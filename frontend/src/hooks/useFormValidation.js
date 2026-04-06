import { useState, useCallback } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  const validateField = useCallback((name, value) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      if (name === 'span') {
        const num = parseFloat(value);
        if (value !== '' && (!isNaN(num) && (num < 20 || num > 45))) {
          newErrors.span = 'Outside software range (20 - 45)';
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
      return newErrors;
    });

    setWarnings(prev => {
      const newWarnings = { ...prev };
      if (name === 'skewAngle') {
        const num = parseFloat(value);
        if (value !== '' && (!isNaN(num) && (num < -15 || num > 15))) {
          newWarnings.skewAngle = 'IRC 24 (2010) requires detailed analysis';
        } else {
          delete newWarnings.skewAngle;
        }
      }
      return newWarnings;
    });
  }, []);

  return { errors, warnings, validateField };
};
