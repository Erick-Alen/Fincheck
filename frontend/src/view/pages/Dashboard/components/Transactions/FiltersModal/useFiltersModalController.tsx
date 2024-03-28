import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useState } from 'react';

// interface useFiltersModalProps {}

export const useFiltersModal = () => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { accounts } = useBankAccounts()

  const handleSelectionBankAccountId = (bankAccountId: string) => {
    setSelectedBankAccountId((prev) =>
      prev === bankAccountId ? undefined : bankAccountId
    );
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear((prev) => prev + step);
  };

  return {
    selectedBankAccountId,
    handleSelectionBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  };
};
