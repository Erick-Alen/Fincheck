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
import { cn } from '@/app/utils/cn';
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { Spinner } from '@/view/components/Spinner';
import emptyStateImagef from '@/assets/images/empty-state.svg';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { FiltersModal } from './FiltersModal';
import { formatDate } from '@/app/utils/formatDate';

export const Transactions = () => {
  const {
    setSliderState,
    sliderState,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    isPending,
    isFetching,
    handleChangeMonth,
    filters,
  } = useTransactionsController();
  const hasTransactions = transactions.length > 0;
  const { valuesVisible } = useDashboard();

  return (
    <div className='bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col'>
      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
      />
      {isPending && (
        <div className='h-full w-full flex items-center justify-center'>
          <Spinner className='w-10 h-10' />
        </div>
      )}
      {!isPending && (
        <>
          <header>
            <Swiper
              spaceBetween={16}
              slidesPerView={3.2}
              initialSlide={filters.month}
              centeredSlides
              onSlideChange={(swiper) => {
                handleChangeMonth(swiper.realIndex);
                // setSliderState({
                //   isBeginning: swiper.isBeginning,
                //   isEnd: swiper.isEnd,
                // });
              }}
            >
              <div
                slot='container-start'
                className='flex items-center justify-between'
              >
                <TransactionTypeDropdown />
                <div className='flex gap-4'>
                  <SliderNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
                  <button onClick={handleOpenFiltersModal}>
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
            {isFetching && (
              <Spinner className='w-10 h-10 relative top-1/2 left-1/2' />
            )}

            {!hasTransactions && !isFetching && (
              <div className='w-full h-full flex flex-col items-center justify-center'>
                <img
                  src={emptyStateImagef}
                  alt='Nenhuma transação encontrada'
                />
                <span className='font-medium text-gray-700'>
                  Não encontramos nenhuma Transação!
                </span>
              </div>
            )}

            {hasTransactions &&
              !isFetching &&
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'
                >
                  <div className='flex items-center gap-3 flex-1'>
                    <CategoryIcon
                      type={
                        transaction.type.toLowerCase() as 'income' | 'outcome'
                      }
                      category={transaction.category?.icon}
                    />
                    <div>
                      <strong className='font-bold tracking-[-0.5px] block'>
                        {transaction.name}
                      </strong>
                      <span className='text-sm text-gray-600'>
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'font-medium tracking-[-0.5px]',
                      transaction.type === 'INCOME' && 'text-green-800',
                      transaction.type === 'OUTCOME' && 'text-red-800',
                      !valuesVisible && 'blur-sm transition-all'
                    )}
                  >
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
