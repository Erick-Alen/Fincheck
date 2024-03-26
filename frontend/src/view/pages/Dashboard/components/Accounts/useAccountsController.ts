import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountService';
import { QUERY_KEYS } from '@/app/config/constants';

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

  const { isFetching, data } = useQuery({
    queryKey: [`${QUERY_KEYS.ACCOUNTS}`],
    queryFn: bankAccountsService.getAll,
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
    accounts: data ?? [],
    isFetching
  }
}
