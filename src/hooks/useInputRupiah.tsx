'use client';

import { useState, useCallback } from 'react';
import FormatRupiah from '@/components/elements/FormatRupiah';

const useInputRupiah = () => {
  const [nominal, setNominal] = useState<string>('');

  const handleNominal = useCallback((value: string) => {
    const inputValue = value;
    const numericValue = inputValue.replace(/\D/g, '');
    let parsedValue = parseInt(numericValue);
    parsedValue = isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
    const formattedValue = FormatRupiah(parsedValue);
    setNominal(formattedValue);
  }, []);

  return { nominal, handleNominal };
};

export default useInputRupiah;
