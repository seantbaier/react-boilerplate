import { fetchDog } from '@/api/animalApi';
import { useApi } from '@/api/hooks/useApi';

export const useFetchDog = () => {
  const {
    data: dog,
    exec: initFetchDog,
    status: fetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApi(() => fetchDog().then((response) => response.data.message));

  return {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusError,
    isFetchDogStatusSuccess,
  };
};
