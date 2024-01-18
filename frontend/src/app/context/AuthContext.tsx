import { ReactNode, createContext } from 'react';

type AuthContextValue = {
  signedIn: boolean;
};

export const AuthContext = createContext({} as AuthContextValue );

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        signedIn: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
