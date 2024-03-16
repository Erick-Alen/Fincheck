import { useDashboard } from '../../components/DashboardContext/useDashboardContext'

export function useNewAccountModalController () {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  return { isNewAccountModalOpen, closeNewAccountModal };
}
