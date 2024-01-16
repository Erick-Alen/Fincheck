import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRegisterController } from './useRegisterController';

export const Register = () => {
  const { errors, onSubmit, register } = useRegisterController()
  return (
    <>
      <header className='w-full flex flex-col items-center gap-4 text-center'>
        <h1 className='text-gray-900 text-2xl font-bold tracking-[-1px]'>
          Crie sua conta
        </h1>
        <p className='space-x-2 tracking-[-0.5px]'>
          <span className='text-gray-700'>Já possui uma conta?</span>
          <Link
            to='/login'
            className='text-teal-900 font-medium tracking-[-0.5px]'
          >
            Fazer Login
          </Link>
        </p>
      </header>
      <form onSubmit={onSubmit} className='w-full flex flex-col gap-4 mt-16' action='submit'>
        <Input {...register("name")} error={errors.name?.message}  placeholder='Nome' />
        <Input {...register("email")} error={errors.email?.message} placeholder='E-mail' type='email' />
        <Input {...register("password")} error={errors.password?.message} placeholder='Senha' type='password' />
        <Button type='submit' className='bg-teal-900 mt-2 px-6'>
          Criar conta
        </Button>
      </form>
    </>
  );
};
