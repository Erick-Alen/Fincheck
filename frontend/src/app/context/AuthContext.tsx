import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { storageKeys } from '../config/storageKeys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import toast from 'react-hot-toast';
import { LaunchScreen } from '@/view/components/LaunchScreen';

type AuthContextValue = {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const queryClient = useQueryClient()
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
    return !!storageAccessToken;
  });

  // const setAccessToken = useCallback((accessToken: string) => {
  //   httpClient.defaults.headers.common[
  //     'Authorization'
  //   ] = `Bearer ${accessToken}`;
  // }, []);

  // useEffect(() => {
  //   const storedAccessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
  //   if (storedAccessToken) {
  //     setAccessToken(storageKeys.ACCESS_TOKEN);
  //   }
  // }, [setAccessToken]);

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
    // setAccessToken(storageKeys.ACCESS_TOKEN);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(storageKeys.ACCESS_TOKEN);
    queryClient.clear();
    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Session expired!');
      signOut();
    }
  }, [isError, signOut]);

  if (isFetching) {
  }
  // return <LaunchScreen />;

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
};
