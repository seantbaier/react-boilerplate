import { fetchDog } from '@/api/animalApi';
import { useState } from 'react';

export const useFetchDog = () => {
  const [dog, setDog] = useState<string>();

  const initFetchDog = async () => {
    const response = await fetchDog();
    setDog(response.data.message);
  };

  return {
    dog,
    initFetchDog,
  };
};
