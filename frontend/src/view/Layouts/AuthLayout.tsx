import { Outlet } from 'react-router-dom';
import illustration from '../../assets/images/login.png';
// import bankCard from '../../assets/images/bank-card-double.png';
import { Logo } from '../components/Logo';

export const AuthLayout = () => {
  // mobile first concept applied in the components

  return (
    <div className='flex h-full w-full'>
      <div className='w-full lg:w-1/2 h-full flex flex-col items-center justify-center gap-16'>
        <Logo className='h-6 text-gray-500' />
        <div className=' w-full max-w-[504px] px-8'>
          <Outlet />
        </div>
      </div>

      <div className='hidden w-1/2 h-full justify-center items-center p-8 relative lg:flex'>
        <img
          src={illustration}
          className=' object-cover w-full h-full max-w-[500px] max-h-[960px] select-none rounded-[32px] '
        />
        <div className='bottom-8 absolute max-w-[500px] bg-white rounded-b-[32px] px-10 py-5 '>
          <Logo className='text-teal-900 h-8' />
          <p className='font-medium text-md text-gray-700 mt-2'>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
};
