import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useMemo, useState } from 'react'
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
    isNewAccountModalOpen,
    openEditAccountModal
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { isFetching, data } = useQuery({
    // queryKey: [QUERY_KEYS.ACCOUNTS],
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
    // refetchInterval: false,
    // refetchOnWindowFocus: true,
    // retryOnMount: true
  })

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0) ?? 0
  }, [data])

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
    isFetching,
    currentBalance,
    openEditAccountModal
  }
}
