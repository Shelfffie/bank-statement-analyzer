import { CsvFormat } from "@/app/_utils/types";

export const filterByItem = (
  category: "default" | "profit" | "exprenses",
  data: CsvFormat[]
) => {
  if (category === "default") {
    return data;
  } else if (category === "profit") {
    return data.filter((item) => item.type === "дохід");
  } else {
    return data.filter((item) => item.type === "витрати");
  }
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
    item[selectedItem].toLowerCase().includes(inputValue.toLowerCase())
  );
};

export const calculateTotal = (
  data: CsvFormat[],
  result: "profit" | "expenses" | "net profit"
) => {
  const reduced = data.reduce((total: number, current: CsvFormat) => {
    if (!current.type) {
      current.type = String(current.amount).startsWith("-")
        ? "витрати"
        : "дохід";
    }
    if (result === "profit" && current.type === "дохід")
      return total + current.amount;
    else if (result === "expenses" && current.type === "витрати")
      return total + current.amount;
    else if (result === "net profit") return total + current.amount;
    return total;
  }, 0);

  return Math.floor(reduced * 100) / 100;
};
