import { CsvFormat } from "../utils/types";

const normalizeTypes = (item: CsvFormat): CsvFormat => {
  return {
    ...item,
    type:
      item.type ?? (String(item.amount).startsWith("-") ? "витрати" : "дохід"),
  };
};

const filterExpenses = (data: CsvFormat[]) => {
  return data.map(normalizeTypes).filter((item) => item.type === "витрати");
};

const groupByCounterparty = (data: CsvFormat[]) => {
  return Object.values(
    data.reduce<Record<string, CsvFormat>>((acc, item) => {
      const key = item.counterparty;

      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key] = {
          ...acc[key],
          amount: acc[key].amount + item.amount,
        };
      }
      return acc;
    }, {})
  );
};

export const getTop5 = (data: CsvFormat[]) => {
  const expensesOnly = filterExpenses(data);
  const result: CsvFormat[] = groupByCounterparty(expensesOnly)
    .sort((a, b) => a.amount - b.amount)
    .slice(0, 5);

  return result;
};
