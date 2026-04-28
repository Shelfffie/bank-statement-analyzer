export type ParsedFormat = {
  date: string;
  counterparty: string;
  description: string;
  amount: string;
};

export type CsvFormat = {
  id?: number;
  date: string;
  counterparty: string;
  description: string;
  amount: number;
  type?: string;
  error?: string | undefined;
};
