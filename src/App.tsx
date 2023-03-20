import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

import SearchMealExample from '@/components/SearchMealExample';
import AnimalExample from '@/components/AnimalExample';

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>React - The Road To Enterprise</h1>
      <AnimalExample />
      <SearchMealExample />
    </div>
  );
}

export default App;
