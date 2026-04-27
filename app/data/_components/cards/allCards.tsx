import { CsvFormat } from "@/app/_utils/types";
import SummariesCard from "./card";
import { calculateTotal } from "../../utils/statement";

export default function DisplayAllCards({ data }: { data: CsvFormat[] }) {
  const net = calculateTotal(data, "net profit");
  return (
    <div className="flex flex-row gap-10">
      <SummariesCard
        data={calculateTotal(data, "profit")}
        title={"Загальний дохід"}
        classes="!text-green-500"
      />
      <SummariesCard
        data={calculateTotal(data, "expenses")}
        title={"Загальнні витрати"}
        classes="!text-red-500"
      />
      <SummariesCard
        data={net}
        title={"Чистий результат"}
        classes={
          String(net).startsWith("-") ? "!text-red-500" : "!text-green-500"
        }
      />
      <SummariesCard data={data.length} title={"Кількість транзакцій"} />
    </div>
  );
}
