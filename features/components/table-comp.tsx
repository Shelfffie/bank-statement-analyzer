import { CsvFormat } from "@/features/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableComponent({
  data,
  skipped,
}: {
  data: CsvFormat[];
  skipped?: boolean;
}) {
  return (
    <div className="w-11/12 m-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Дата</TableHead>
            <TableHead>Контрагент</TableHead>
            <TableHead>Призначення</TableHead>
            <TableHead className="text">Сума</TableHead>
            <TableHead className="text-right">Tип</TableHead>
            {skipped && (
              <TableHead className="text-right">Причина вилучення</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.date}</TableCell>
              <TableCell>{item.counterparty}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-right">{item.type}</TableCell>
              {skipped && (
                <TableCell className="text-right">{item.error}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
