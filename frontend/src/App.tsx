import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/context/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    }
  });
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     <h1 className='bg-red-500 text-white px-10'>
    //       Edit <code>frontend/src/App.tsx</code> and save to reload.
    //     </h1>
    //   </header>
    // </div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};
