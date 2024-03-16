import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboardContext';

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();
  const {
    toggleValuesVisible,
    valuesVisible,
    openNewAccountModal,
    closeNewAccountModal,
    isNewAccountModalOpen
  } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValuesVisible,
    valuesVisible,
    isLoading: false,
    isNewAccountModalOpen,
    openNewAccountModal,
    closeNewAccountModal,
    accounts: []
  }
}
