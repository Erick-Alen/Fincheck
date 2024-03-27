import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useMemo, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountsService';
import { QUERY_KEYS } from '@/app/config/constants';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';

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


  const { accounts, isFetching } = useBankAccounts();


  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0) ?? 0
  }, [accounts])

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
    accounts: accounts,
    isFetching,
    currentBalance,
    openEditAccountModal
  }
}
