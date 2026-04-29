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
  data: CsvFormat[];
  filteredData: CsvFormat[];
  skippedFields: CsvFormat[];
  isLoading: boolean;
  search: string;
  selectedItem: "default" | "counterparty" | "description";
  category: "default" | "profit" | "expenses";
};

export type Action =
  | {
      type: "init";
      payload: {
        data: CsvFormat[];
        skippedFields: CsvFormat[];
        filteredData: CsvFormat[];
      };
    }
  | {
      type: "setSearch";
      payload: {
        value: string;
        selectedItem: "default" | "counterparty" | "description";
      };
    }
  | {
      type: "setCategory";
      payload: {
        value: "default" | "profit" | "expenses";
      };
    }
  | { type: "setLoading"; payload: boolean };
