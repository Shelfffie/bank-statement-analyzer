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

export type State = {
  data: any[];
  search: string;
  category: string | null;
};

export type Action =
  | { type: "init"; payload: { data: CsvFormat[]; skippedFields: CsvFormat[] } }
  | { type: "setSearch"; payload: string }
  | { type: "setCategory"; payload: string | null }
  | { type: "setLoading"; payload: boolean };
