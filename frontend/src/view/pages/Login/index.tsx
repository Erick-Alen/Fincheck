import { Link } from 'react-router-dom';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';

export const Login = () => {
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
      <form className='w-full flex flex-col gap-4 mt-16' action='submit'>
        <Input name='E-mail' placeholder='E-mail' type='email' />
        <Input name='Senha' placeholder='Senha' type='password' />
        <Button type='submit' className='bg-teal-900 mt-2 px-6'>
          Entrar
        </Button>
      </form>
    </>
  );
};
