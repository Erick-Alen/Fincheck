import { useDashboard } from '../../components/DashboardContext/useDashboardContext'

export function useNewTransactionModalController () {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard();
  return { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType };
}
