import { useState } from 'react';

export const useGeometryLogic = (overallWidth) => {
  const [spacing, setSpacing] = useState('');
  const [girders, setGirders] = useState('');
  const [overhang, setOverhang] = useState('');

  const handleSpacingChange = (e) => {
    const s = e.target.value;
    setSpacing(s);
    if (s && overhang !== '' && overallWidth) {
      const sNum = parseFloat(s);
      const oNum = parseFloat(overhang);
      if (sNum > 0) {
        setGirders(Math.round((overallWidth - oNum) / sNum).toString());
      }
    }
  };

  const handleGirdersChange = (e) => {
    const n = e.target.value;
    setGirders(n);
    if (n && overhang !== '' && overallWidth) {
      const nNum = parseInt(n, 10);
      if (nNum > 0) {
        setSpacing(((overallWidth - parseFloat(overhang)) / nNum).toFixed(3));
      }
    }
  };

  const handleOverhangChange = (e) => {
    const o = e.target.value;
    setOverhang(o);
    if (o && spacing !== '' && overallWidth) {
      const sNum = parseFloat(spacing);
      const oNum = parseFloat(o);
      if (sNum > 0) {
        setGirders(Math.round((overallWidth - oNum) / sNum).toString());
      }
    }
  };

  const sNum = parseFloat(spacing);
  const nNum = parseInt(girders, 10);
  const oNum = parseFloat(overhang);

  let isSpacingValid = !isNaN(sNum) && sNum > 0 && sNum < overallWidth;
  let isOverhangValid = !isNaN(oNum) && oNum >= 0 && oNum < overallWidth;
  let isGirdersValid = !isNaN(nNum) && nNum > 0 && nNum < overallWidth;
  
  let calculatedN = null;
  let isMatch = false;

  if (isSpacingValid && isOverhangValid) {
    calculatedN = (overallWidth - oNum) / sNum;
    if (isGirdersValid) {
      isMatch = Math.abs(calculatedN - nNum) < 0.001;
    }
  }

  const isValid = isMatch && isSpacingValid && isOverhangValid && isGirdersValid;

  return {
    spacing, setSpacing, handleSpacingChange,
    girders, setGirders, handleGirdersChange,
    overhang, setOverhang, handleOverhangChange,
    sNum, nNum, oNum,
    isSpacingValid, isOverhangValid, isGirdersValid,
    calculatedN, isMatch, isValid
  };
};
