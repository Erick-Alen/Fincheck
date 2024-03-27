import { storageKeys } from '@/app/config/storageKeys';
import { BankAccount } from '@/app/entities/BankAccount';
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

  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: null | BankAccount;
};

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  //Values visible localStorage retrieval
  const [valuesVisible, setValuesVisible] = useState<boolean | undefined>(
    () => {
      const visibleValues = localStorage.getItem(storageKeys.VALUES_VISIBLE);
      if (visibleValues) {
        return visibleValues === 'true' ? true : false;
      }
    }
  );

  //NEW TRANSACTION MODAL
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

  //NEW ACCOUNT MODAL
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] =
    useState<boolean>(false);
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

  //EDIT ACCOUNT MODAL
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState<boolean>(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null);
  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);
  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
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

        isEditAccountModalOpen,
        openEditAccountModal,
        closeEditAccountModal,
        accountBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// export const useDashboard = () => {
//   return useContext(DashboardContext);
// };
