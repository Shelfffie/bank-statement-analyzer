import { CsvFormat } from "@/app/_utils/types";

export const filterByItem = (
  e: string,
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>,
  data: CsvFormat[]
) => {
  if (e === "default") {
    setFilteredData(data);
  } else if (e === "profit") {
    setFilteredData(data.filter((item) => item.type === "дохід"));
  } else {
    setFilteredData(data.filter((item) => item.type === "витрати"));
  }
};

export const searchFilter = (
  inputValue: string,
  timer: NodeJS.Timeout | null,
  data: CsvFormat[],
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>,
  selectedItem: "counterparty" | "description"
) => {
  timer = setTimeout(() => {
    const result = data.filter((item) =>
      item[selectedItem].toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(result);
  }, 1000);
};

export const calculateTotal = (
  data: CsvFormat[],
  result: "profit" | "expenses" | "net profit"
) => {
  const reduced = data.reduce((total: number, current: CsvFormat) => {
    if (result === "profit" && current.type === "дохід")
      return total + current.amount;
    else if (result === "expenses" && current.type === "витрати")
      return total + current.amount;
    else if (result === "net profit") return total + current.amount;
    return total;
  }, 0);

  return Math.floor(reduced * 100) / 100;
};
