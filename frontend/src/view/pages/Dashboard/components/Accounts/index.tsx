import { EyeIcon } from '@/view/components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { AccountsSliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';

export const Accounts = () => {
  const { setSliderState, sliderState, windowWidth } = useAccountsController();
  return (
    <div className='bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col'>
      <span className='text-white tracking-[-0.5px] block'>Saldo Total</span>
      <div className='flex items-center gap-2 '>
        <strong className='text-white text-2xl tracking-[-1px]'>
          R$ 100,00
        </strong>
        <button className='w-8 h-8 flex items-center justify-center'>
          <EyeIcon open />
        </button>
      </div>
      <div className='flex-1 flex flex-col justify-end mt-10 md:mt:0'>
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
              <strong className='text-white text-lg font-bold tracking-[-1px]'>
                Minhas contas
              </strong>
              <AccountsSliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
            </div>
            <SwiperSlide>
              <AccountCard
                balance={1400.0}
                color='#7950f2'
                name='Nubank'
                type='CASH'
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={600}
                color='#353535'
                name='XP'
                type='INVESTMENT'
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={600}
                color='#9c0000'
                name='Market'
                type='CHECKING'
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};