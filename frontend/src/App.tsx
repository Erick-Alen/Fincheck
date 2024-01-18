import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/context/AuthContext';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     <h1 className='bg-red-500 text-white px-10'>
    //       Edit <code>frontend/src/App.tsx</code> and save to reload.
    //     </h1>
    //   </header>
    // </div>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};
