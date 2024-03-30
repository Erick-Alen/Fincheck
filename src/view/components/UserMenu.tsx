import { useAuth } from '@/app/hooks/useAuth';
import { DropdownMenu as DDM } from './Dropdown';
import { ExitIcon } from '@radix-ui/react-icons';

export const UserMenu = () => {
  const { signOut, user } = useAuth();
  return (
    <DDM.Root>
      <DDM.Trigger>
        <div className='bg-teal-50 rounded-full w-10 h-10 flex items-center justify-center'>
          <span className='text-sm tracking-[-0.5px] text-teal-900 font-medium'>
            {user?.name.slice(0,2).toUpperCase()}
          </span>
        </div>
      </DDM.Trigger>

      <DDM.PortalContent className='w-28 cursor-pointer outline-none'>
        <DDM.Item onClick={signOut} className='flex items-center justify-between outline-none'>
          {/* <button
            // className='flex items-center justify-between'
            onClick={signOut}
          > */}
          Sair
          <ExitIcon />
          {/* </button> */}
        </DDM.Item>
      </DDM.PortalContent>
    </DDM.Root>
  );
};
