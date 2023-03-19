import { useEffect } from 'react';

import { useFetchCat } from '@/hooks/useFetchCat';
import { useFetchDog } from '@/hooks/useFetchDog';

export const useFetchAnimals = () => {
  const { dog, initFetchDog } = useFetchDog();
  const { cat, initFetchCat } = useFetchCat();

  const fetchAnimals = () => {
    initFetchDog();
    initFetchCat();
  };

  useEffect(() => {
    fetchAnimals();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    dog,
    cat,
    fetchAnimals,
  };
};
