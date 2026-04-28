import { CsvFormat } from "../../_utils/types";

export const TopCounterparties = (data: CsvFormat[]) => {
  const expensesOnly = data.filter((item) => {
    if (!item.type) {
      item.type = String(item.amount).startsWith("-") ? "витрати" : "дохід";
    }
    return item.type === "витрати";
  });
  const result: CsvFormat[] = Object.values(
    expensesOnly.reduce<Record<string, CsvFormat>>((acc, item) => {
      const key = item.counterparty;

      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].amount += item.amount;
      }
      return acc;
    }, {})
  )
    .sort((a, b) => {
      return a.amount - b.amount;
    })
    .splice(0, 5);

  return result;
};
