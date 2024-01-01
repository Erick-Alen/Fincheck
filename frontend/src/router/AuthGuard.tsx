import { Navigate, Outlet } from 'react-router-dom';

type AuthGuardProps = {
  signedIn?: boolean;
  isPrivate: boolean;
};

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const signedIn = false;
  if (!signedIn && isPrivate) {
    //redirect to /login
    return <Navigate to={'/login'} replace />;
    //replace => user can't go back to a private route after logging in
  }
  if (signedIn && !isPrivate) {
    //redirect to /dashboard
    return <Navigate to={'/'} />;
  }
  return (
    //   <div>
    //     <header className='w-full bg-green-600 h-10'></header>
    //     <div className='flex'>
    //       <nav className='w-80 bg-green-700 h-96'>
    <Outlet />
    //     </nav>
    //   </div>
    // </div>
  );
};
