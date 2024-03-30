import { Transaction } from '@/app/entities/Transaction';
import { useTransactions } from '@/app/hooks/useTransactions';
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { useEffect, useState } from 'react'

export const useTransactionsController = () => {
  const windowWidth = useWindowWidth();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null)

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  //transactions modal
    const handleOpenTransactionModal = (transaction: Transaction) => {
    setTransactionBeingEdited(transaction)
    setIsEditModalOpen(true)
  }
  const handleCloseTransactionModal = () => {
    setTransactionBeingEdited(null)
    setIsEditModalOpen(false)
  }

  // const handleChangeMonth = (month: number) => {

  //   setFilters(prevstate => ({
  //     ...prevstate,
  //     month
  //   }))
  // }

  // const handleChangeFilters = (filter: keyof TransactionsFilters) => {
  //   return (value: number) => {
  //     if (value === filters[filter]) return;

  //   }
  // }

  //filters modal
  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter){
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;
      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  const handleApplyFilters = ({bankAccountId, year}: { bankAccountId: string | undefined, year: number }) => {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    handleCloseFiltersModal();
  }

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true)
  }
  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false)
  }

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { transactions, refetch, isPending, isFetching } = useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch])

  // if(isLoading)console.log({isLoading})
  // if(isPending)console.log({isPending});
  // if(isFetching)console.log({isFetching});
  return {
    sliderState,
    setSliderState,
    windowWidth,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isPending,
    isFetching,
    isEditModalOpen,
    handleOpenTransactionModal,
    handleCloseTransactionModal,
    transactionBeingEdited
  }
}
