import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';
import { routes } from './routes';

type AuthGuardProps = {
  signedIn?: boolean;
  isPrivate: boolean;
};

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    //redirect to /login
    return <Navigate to={routes.login} replace />;
    //replace => user can't go back to a private route after logging in
  }

  if (signedIn && !isPrivate) {
    //redirect to /dashboard
    return <Navigate to={routes.dashboard} />;
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
