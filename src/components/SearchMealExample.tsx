import { useEffect, useState } from 'react';

import { useFetchMeals } from '@/hooks/useFetchMeals';

const SearchMealExample = () => {
  const [query, setQuery] = useState('');
  const { meals, fetchMeals } = useFetchMeals();

  useEffect(() => {
    fetchMeals(query);
  }, [query]);

  return (
    <div className='py-8 max-w-2xl mx-auto'>
      <form className='mb-8'>
        <fieldset className='flex flex-col'>
          <label className='mb-4 font-semibold' htmlFor='meal'>
            Search meal
          </label>
          <input
            className='px-4 py-2 border border-gray-300 rounded-lg'
            type='text'
            autoComplete='off'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id='meal'
          />
        </fieldset>
      </form>
      <div>
        <h1 className='font-bold text-2xl mb-4'>Meals</h1>
        <div className='max-h-60 overflow-y-auto'>
          {meals.map((meal) => (
            <div className='py-1 odd:bg-gray-200' key={meal.idMeal}>
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMealExample;
