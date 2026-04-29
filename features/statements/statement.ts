import { CsvFormat } from "@/features/utils/types";

export const filterByItem = (
  category: "default" | "profit" | "expenses",
  data: CsvFormat[]
) => {
  const values = {
    default: data,
    profit: data.filter((item) => item.type === "дохід"),
    expenses: data.filter((item) => item.type === "витрати"),
  };
  return values[category];
};

export const searchFilter = (
  inputValue: string,
  data: CsvFormat[],
  selectedItem: "default" | "counterparty" | "description"
) => {
  if (selectedItem === "default") {
    return data;
  }
  return data.filter((item) =>
    String(item[selectedItem]).toLowerCase().includes(inputValue.toLowerCase())
  );
};

export const calculateTotal = (
  data: CsvFormat[],
  result: "profit" | "expenses" | "net profit"
) => {
  const reduced = data.reduce((total: number, current: CsvFormat) => {
    const type =
      current.type ??
      (String(current.amount).startsWith("-") ? "витрати" : "дохід");

    if (result === "profit" && type === "дохід") return total + current.amount;
    else if (result === "expenses" && type === "витрати")
      return total + current.amount;
    else if (result === "net profit") return total + current.amount;
    return total;
  }, 0);

  return Math.floor(reduced * 100) / 100;
};
