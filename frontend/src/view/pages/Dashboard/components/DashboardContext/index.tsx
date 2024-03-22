import { storageKeys } from '@/app/config/storageKeys';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

type DashboardContextProps = {
  valuesVisible: boolean | undefined;
  toggleValuesVisible: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
};

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [valuesVisible, setValuesVisible] = useState<boolean | undefined>(
    () => {
      const visibleValues = localStorage.getItem(storageKeys.VALUES_VISIBLE);
      if (visibleValues) {
        return visibleValues === 'true' ? true : false;
      }
    }
  );
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false);
  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen,
  ] = useState<boolean>(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setIsNewTransactionModalOpen(true)
    setNewTransactionType(type);
  }, [])
  const closeNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
    setNewTransactionType(null);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])
  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])
  const toggleValuesVisible = useCallback(() => {
    setValuesVisible((prev) => !prev);
    localStorage.setItem(
      storageKeys.VALUES_VISIBLE,
      JSON.stringify(!valuesVisible)
    );
  }, []);

  useEffect(() => {
    const valuesVisible = localStorage.getItem('valuesVisible');
    if (valuesVisible) {
      setValuesVisible(valuesVisible === 'true' ? true : false);
    }
  }, []);
  return (
    <DashboardContext.Provider
      value={{
        valuesVisible,
        toggleValuesVisible,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// export const useDashboard = () => {
//   return useContext(DashboardContext);
// };
