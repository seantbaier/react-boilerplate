import { fetchCat } from '@/api/animalApi';
import { useState } from 'react';

export const useFetchCat = () => {
  const [cat, setCat] = useState<string>();

  const initFetchCat = async () => {
    const response = await fetchCat();
    setCat(response.data?.[0].url);
  };

  return {
    cat,
    initFetchCat,
  };
};
