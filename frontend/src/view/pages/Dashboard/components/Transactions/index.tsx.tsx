import { MONTHS } from '@/app/config/constants';
import { FilterIcon } from '@/view/components/icons/FilterIcon';
import { TransactionsIcon } from '@/view/components/icons/TransactionsIcon';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { useTransactionsController } from './useTransactionsController';

export const Transactions = () => {
  const { setSliderState, sliderState, windowWidth } =
    useTransactionsController();
  return (
    <div className='bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10'>
      <header>
        <Swiper
          spaceBetween={16}
          slidesPerView={3.2}
          centeredSlides
          onSlideChange={(swiper) => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
        >
          <div
            slot='container-start'
            className='flex items-center justify-between'
          >
            <button className='flex items-center gap-2'>
              <TransactionsIcon />
              <span className='text-sm text-gray-800 tracking-[-0.5] font-medium'>
                Transações
              </span>
              <ChevronDownIcon />
            </button>
            <div className='flex gap-4'>
              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
              <button>
                <FilterIcon />
              </button>
            </div>
          </div>
          <div className='mt-6 relative'>
            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption
                    index={index}
                    isActive={isActive}
                    month={month}
                  />
                )}
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </header>
      <main>
        <div className='mt-4'>
          <h1>Transações</h1>
        </div>
      </main>
    </div>
  );
};
