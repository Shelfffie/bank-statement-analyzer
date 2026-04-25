import { CsvFormat } from "@/app/_utils/types";
import SummariesCard from "./card";

export default function DisplayAllCards({ data }: { data: CsvFormat[] }) {
  const calculateTotal = (
    data: CsvFormat[],
    result: "profit" | "expenses" | "net profit"
  ) => {
    return data.reduce((total: number, current: CsvFormat) => {
      if (result === "profit" && current.type === "дохід")
        return total + current.amount;
      else if (result === "expenses" && current.type === "витрати")
        return total + current.amount;
      else if (result === "net profit") return total + current.amount;
      return total;
    }, 0);
  };

  return (
    <div>
      <SummariesCard
        data={calculateTotal(data, "profit")}
        title={"Загальний дохід"}
      />
      <SummariesCard
        data={calculateTotal(data, "expenses")}
        title={"Загальнні витрати"}
      />
      <SummariesCard
        data={calculateTotal(data, "net profit")}
        title={"Чистий результат"}
      />
      <SummariesCard data={data.length} title={"Кількість транзакцій"} />
    </div>
  );
}
