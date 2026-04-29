import { CsvFormat } from "@/features/utils/types";
import SummariesCard from "./card";
import { calculateTotal } from "../../statements/statement";

export default function DisplayAllCards({ data }: { data: CsvFormat[] }) {
  const net = calculateTotal(data, "net profit");

  const cardsData = [
    {
      data: calculateTotal(data, "profit"),
      title: "Загальний дохід",
      classes: "!text-green-500",
    },
    {
      data: calculateTotal(data, "expenses"),
      title: "Загальні витрати",
      classes: "!text-red-500",
    },
    {
      data: net,
      title: "Чистий результат",
      classes: String(net).startsWith("-")
        ? "!text-red-500"
        : "!text-green-500",
    },
    {
      data: data.length,
      title: "Кількість транзакцій",
    },
  ];
  return (
    <div className="flex flex-row gap-10">
      {cardsData.map((card) => (
        <SummariesCard
          key={card.title}
          data={card.data}
          title={card.title}
          classes={card.classes}
        />
      ))}
    </div>
  );
}
