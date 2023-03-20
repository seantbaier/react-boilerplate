import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Meal, searchMeals } from '@/api/mealApi';
import { didAbort } from '@/api/api';
import type { Canceler } from '@/api/api.types';

type AbortRef = {
  abort?: Canceler;
};

export const useFetchMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const abortRef = useRef<AbortRef>({});

  const handleQuoteError = (error: unknown) => {
    if (didAbort(error)) {
      toast.error('Request aborted!');
    } else {
      toast.error('Oops, error!');
    }
  };

  const fetchMeals = async (query: string) => {
    try {
      // Abort the previous request if there was one
      abortRef.current.abort?.();
      // Search for new meals
      const newMeals = await searchMeals(query, {
        // Assign the canceler method to the abortRef
        abort: (abort) => (abortRef.current.abort = abort),
      });

      setMeals(newMeals ?? []);
    } catch (error) {
      console.error(error);
      handleQuoteError(error);
    }
  };
  return {
    meals,
    fetchMeals,
  };
};
