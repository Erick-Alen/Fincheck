import { useState } from 'react';

// interface useFiltersModalProps {}

export const useFiltersModal = () => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSelectionBankAccountId = (bankAccountId: string) => {
    setSelectedBankAccountId((prev) =>
      prev === bankAccountId ? null : bankAccountId
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
  };
};
