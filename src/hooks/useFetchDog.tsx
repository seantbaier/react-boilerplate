import { useState } from 'react';

import { fetchDog } from '@/api/animalApi';
import { withAsync } from '@/utils/withAsync';
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus';
import { useApiStatus } from '@/api/hooks/useApiStatus';

export const useFetchDog = () => {
  const [dog, setDog] = useState<string>();

  const {
    status: fetchDogStatus,
    setStatus: setFetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApiStatus(IDLE);

  const initFetchDog = async () => {
    setFetchDogStatus(PENDING);
    const { response, error } = await withAsync(() => fetchDog());

    if (error) {
      setFetchDogStatus(ERROR);
    } else if (response) {
      setDog(response.data.message);
      setFetchDogStatus(SUCCESS);
    }
  };

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
