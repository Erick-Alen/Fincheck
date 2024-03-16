import { Logo } from '@/view/components/Logo';
import { UserMenu } from '@/view/components/UserMenu';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions/index.tsx';
import { DashboardProvider } from './components/DashboardContext/index.tsx';
import { Fab } from './components/Fab/index.tsx';
import NewAccountModal from './modals/NewAccountModal/index.tsx';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className='h-full p-4 md:px-8 md:pb-16 md:pt-6 flex flex-col gap-4'>
        <header className='h-10 flex items-center justify-between'>
          <Logo className='h-6 text-teal-900' />
          <UserMenu />
        </header>

        <main className='flex-1 flex flex-col md:flex-row gap-4 max-h-full'>
          <div className='w-full md:w-1/2'>
            <Accounts />
          </div>

          <div className='w-full md:w-1/2'>
            <Transactions />
          </div>
        </main>
        <Fab />
        <NewAccountModal/>
      </div>
    </DashboardProvider>
  );
};
export default Dashboard;
