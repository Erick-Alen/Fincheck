import { EyeIcon } from '@/view/components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { AccountsSliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { cn } from '@/app/utils/cn';
import { Spinner } from '@/view/components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export const Accounts = () => {
  const {
    setSliderState,
    sliderState,
    windowWidth,
    toggleValuesVisible,
    valuesVisible,
    isLoading,
    openNewAccountModal,
    accounts,
    currentBalance,
    openEditAccountModal
  } = useAccountsController();
  return (
    <div className='bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col'>
      {isLoading && (
        <div className='h-full w-full flex items-center justify-center'>
          <Spinner className='text-white fill-teal-950/90 w-10 h-10' />
        </div>
      )}
      {!isLoading && (
        <>
          <span className='text-white font-medium tracking-[-0.5px] block'>
            Saldo Total
          </span>
          <div className='flex items-center gap-2 '>
            <strong
              className={cn(
                'text-white text-2xl tracking-[-1px]',
                !valuesVisible && 'blur-md transition-all'
              )}
            >
              {formatCurrency(currentBalance)}
            </strong>
            <button
              onClick={toggleValuesVisible}
              className='w-8 h-8 flex items-center justify-center'
            >
              <EyeIcon open={valuesVisible} />
            </button>
          </div>
          <div className='flex-1 flex flex-col justify-end mt-10 md:mt:0'>
            {/* No accounts found */}
            {accounts.length === 0 && (
              <>
                <div className='mb-4'>
                  <strong className='text-white text-lg font-bold tracking-[-0.5px]'>
                    Minhas contas
                  </strong>
                </div>
                <button
                  className='flex flex-col items-center justify-center gap-4
                  text-white mt-4 h-52 border-teal-600 border-2 border-dashed rounded-2xl'
                  onClick={openNewAccountModal}
                >
                  <div className='flex justify-center items-center h-12 w-12 rounded-full border-2 border-dashed border-white'>
                    <PlusIcon className='w-6 h-6' />
                  </div>
                  <span className='text-lg font-medium tracking-[-0.5px] block w-32'>
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.2 : 1.2}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div
                    slot='container-start'
                    className='flex items-center justify-between mb-4'
                  >
                    <strong className='text-white text-lg font-bold tracking-[-0.5px]'>
                      Minhas contas
                    </strong>
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>
                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        data={account}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
