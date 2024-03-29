import { Transition } from '@headlessui/react';
import { Logo } from './Logo';
import { Spinner } from './Spinner';

type LaunchScreenProps = {
  isLoading: boolean;
};

export const LaunchScreen = ({ isLoading }: LaunchScreenProps) => {
  return (
    <Transition
      show={isLoading}
      enter='transition-opacity duration-200'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center'>
        <div className='flex flex-col items-center gap-4'>
          <Logo className='h-10 text-white' />
          {isLoading && <Spinner className='text-white fill-teal-900' />}
        </div>
      </div>
    </Transition>
  );
};
