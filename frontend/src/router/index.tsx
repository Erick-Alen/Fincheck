import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
// import { Login } from '../view/pages/Login';
// import { Register } from '../view/pages/Register';
// import { Dashboard } from '../view/pages/Dashboard';
// import { AuthLayout } from '../view/Layouts/AuthLayout';
import { routes } from './routes';
import { Suspense, lazy } from 'react'

const Login = lazy(()=> import('../view/pages/Login'))
const Register = lazy(() => import('../view/pages/Register'));
const Dashboard = lazy(() => import('../view/pages/Dashboard'));
const AuthLayout = lazy(() => import('../view/Layouts/AuthLayout'));

export const Router = () => {
  // const useRouter = useRoutes([
  //   // ...adminRoutes,
  //   // ...userRoutes,
  //   { path: routes.register , element: <Register/>}
  // ]);
  // return useRouter

  return (
    <Suspense fallback={<div className='w-10 h-10 rounded-full border-r-teal-900 border-4 animate-spin'/>}>
      <BrowserRouter>
        <Routes>
          {/* defining a layout for public routes */}
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
            </Route>
          </Route>

          {/* defining a layout for private routes */}
          <Route element={<AuthGuard isPrivate />}>
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
