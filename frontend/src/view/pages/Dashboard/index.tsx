import { useAuth } from '@/app/hooks/useAuth';
import { Logo } from '@/view/components/Logo';
import { UserMenu } from '@/view/components/UserMenu';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions/index.tsx.tsx';

const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <div className='h-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4'>
      <header className='h-12 flex items-center justify-between'>
        <Logo className='h-6 text-teal-900' />
        <UserMenu />
      </header>
      <main className='flex-1 flex flex-col md:flex-row gap-4'>
        <div className='w-wull md:w-1/2'>
          <Accounts />
        </div>

        <div className='w-wull md:w-1/2'>
          <Transactions />
        </div>
      </main>
      <button onClick={signOut}>sair</button>
    </div>
  );
};
export default Dashboard;
