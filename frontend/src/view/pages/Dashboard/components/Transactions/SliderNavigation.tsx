import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

type SliderNavigationProps = {
  isBeginning: boolean,
  isEnd: boolean
}
export const SliderNavigation = ({ isBeginning, isEnd }: SliderNavigationProps) => {
  const swiper = useSwiper();
  return (
    <div className='flex items-center gap-2'>
      <button
        className='bg-white rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40'
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className='text-gray-800 w-6 h-6' />
      </button>
      <button
        className='bg-white rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40'
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className='text-gray-800 w-6 h-6' />
      </button>
    </div>
  );
}
