import { MONTHS } from '@/app/config/constants';
import { FilterIcon } from '@/view/components/icons/FilterIcon';
import { TransactionsIcon } from '@/view/components/icons/TransactionsIcon';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { useTransactionsController } from './useTransactionsController';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';

export const Transactions = () => {
  const { setSliderState, sliderState } = useTransactionsController();
  return (
    <div className='bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col'>
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
      <div className='mt-4 space-y-2 flex-1 overflow-y-auto'>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='expense' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Armozo
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-red-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='income' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Salário
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-green-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='expense' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Armozo
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-red-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='income' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Salário
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-green-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='expense' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Armozo
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-red-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
        <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <CategoryIcon type='income' />
            <div>
              <strong className='font-bold traxking-[-0.5px] block'>
                Salário
              </strong>
              <span className='text-sm text-gray-600'>04/06/2023</span>
            </div>
          </div>
          <span className='font-medium text-green-800 tracking-[-0.5px] '>
            {formatCurrency(1400.0)}
          </span>
        </div>
      </div>
    </div>
  );
};
