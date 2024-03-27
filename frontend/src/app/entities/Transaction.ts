export type Transaction = {
  id: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'OUTCOME';
  category?: {
    id: string;
    name: string;
    icon: string;
  }
}
