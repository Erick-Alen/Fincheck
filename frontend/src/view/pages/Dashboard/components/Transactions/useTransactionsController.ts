import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useState } from 'react'

export const useTransactionsController = () => {
  const windowWidth = useWindowWidth();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true)

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
  return {
    sliderState,
    setSliderState,
    windowWidth,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  }
}
