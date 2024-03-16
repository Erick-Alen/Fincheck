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
  isNewAccountModalOpen: boolean | undefined;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
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
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean | undefined>(false);
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// export const useDashboard = () => {
//   return useContext(DashboardContext);
// };
