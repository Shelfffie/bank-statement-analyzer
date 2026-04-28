export type CsvFormat = {
  id: number;
  date: string;
  counterparty: string;
  description: string;
  amount: number;
  type?: string;
  error?: string | undefined;
};
