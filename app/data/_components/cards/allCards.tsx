import { CsvFormat } from "@/app/_utils/types";
import SummariesCard from "./card";
import { calculateTotal } from "../../utils/statement";

export default function DisplayAllCards({ data }: { data: CsvFormat[] }) {
  return (
    <div className="flex flex-row gap-10">
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
