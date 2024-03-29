import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useMemo, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { BankAccount } from '@/app/entities/BankAccount';

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

  //TODO
  const currentBalance = useMemo(() => {
    return accounts.reduce((total: number, account: BankAccount) => total + account.currentBalance, 0) ?? 0
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
