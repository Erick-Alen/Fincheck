// import { IncomeIconProps } from '@/view/components/icons/IncomeIcon'

export const ChooseiconColor = ({ type }: any) => {
  if (type === undefined) return '#212529';
  if (type === 'expense') return '#FF5C5C'
  if (type === 'income') return '#087F5B'
  if (type === 'transactions') return '#364FC7'
  if (type === 'newAccount') return '#1864AB'
}
