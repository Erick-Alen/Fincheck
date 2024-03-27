import { useTransactions } from '@/app/hooks/useTransactions';
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useState } from 'react'

export const useTransactionsController = () => {
  const windowWidth = useWindowWidth();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)

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

  const { transactions, isPending, isLoading } = useTransactions();

  return {
    sliderState,
    setSliderState,
    windowWidth,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isPending,
  }
}
