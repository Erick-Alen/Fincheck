import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useLoginController } from './useLoginController';

export const Login = () => {
  const { onSubmit, register } = useLoginController();
  return (
    <>
      <header className='w-full flex flex-col items-center gap-4 text-center'>
        <h1 className='text-gray-900 text-2xl font-bold tracking-[-1px]'>
          Entre em sua conta
        </h1>
        <p className='space-x-2 tracking-[-0.5px]'>
          <span className='text-gray-700'>Novo por aqui?</span>
          <Link
            to='/register'
            className='text-teal-900 font-medium tracking-[-0.5px]'
          >
            Crie uma conta
          </Link>
        </p>
      </header>
      <form className='w-full flex flex-col gap-4 mt-16' onSubmit={onSubmit}>
        <Input {...register('email')} error='fasdfgafsdf' placeholder='E-mail' type='email' />
        {/* {errors.email ? <span>{errors.email.message}</span> : <></>} */}
        <Input {...register('password')} placeholder='Senha' type='password' />
        {/* {errors.password ? <span>{errors.password.message}</span> : <></>} */}
        <Button type='submit' className='bg-teal-900 mt-2 px-6'>
          Entrar
        </Button>
      </form>
    </>
  );
};
