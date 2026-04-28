"use client";
import { CsvFormat } from "@/app/_utils/types";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { filterByItem } from "../utils/statement";

export function Filter({
  data,
  setFilteredData,
}: {
  data: CsvFormat[];
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>;
}) {
  return (
    <div className="flex items-center ml-5">
      <Select
        onValueChange={(e) => {
          filterByItem(e, setFilteredData, data);
          console.log(e);
        }}
      >
        <SelectTrigger className="w-full max-w-40 rounded-sm">
          <SelectValue placeholder="Фільтрувати за:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Фільтрувати за типом:</SelectLabel>
            <SelectItem value="default">Стандартний стан</SelectItem>
            <SelectItem value="profit">Дохід</SelectItem>
            <SelectItem value="exprenses">Витрати</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
