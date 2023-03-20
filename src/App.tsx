import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import FetchTopQuotes from '@/components/FetchTopQuotes';
import UpdateQuotes from '@/components/UpdateQuotes';
import PaginatedQuotes from '@/components/PaginatedQuotes';
import InfiniteScrollQuotes from '@/components/InfiniteScrollQuotes';
import QueryCancellation from '@/components/QueryCancellation';
import QueryCancellationWithAbortSignal from './components/QueryCancellationWithAbortSignal';
// import SearchMealExample from '@/components/SearchMealExample';
// import AnimalExample from '@/components/AnimalExample';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <div className='App mx-auto max-w-6xl text-center my-8'>
          <h1 className='font-semibold text-2xl'>
            React - The Road To Enterprise
          </h1>
          <QueryCancellationWithAbortSignal />
          <UpdateQuotes />
          <FetchTopQuotes />
          <PaginatedQuotes />
          <InfiniteScrollQuotes />
          <QueryCancellation />
          {/* <AnimalExample /> */}
          {/* <SearchMealExample /> */}
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
