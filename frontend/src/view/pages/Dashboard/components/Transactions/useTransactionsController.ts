import { useTransactions } from '@/app/hooks/useTransactions';
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { useEffect, useState } from 'react'

export const useTransactionsController = () => {
  const windowWidth = useWindowWidth();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const handleChangeMonth = (month: number) => {

    setFilters(prevstate => ({
      ...prevstate,
      month
    }))
  }

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true)
  }
  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false)
  }

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { transactions, isLoading, refetch, isPending, isFetching } = useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch])
  // if(isLoading)console.log({isLoading})
  // if(isPending)console.log({isPending});
  // if(isFetching)console.log({isFetching});
  return {
    sliderState,
    setSliderState,
    windowWidth,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isPending,
    isFetching,
    handleChangeMonth,
    filters
  }
}
