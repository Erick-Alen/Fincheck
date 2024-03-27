import { BankAccount } from '@/app/entities/BankAccount';
import { httpClient } from '../httpClient';

type BankAccountsResponse = Array<BankAccount>

export const getAll = async () => {
  // await sleep()
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');
  return data;
}
