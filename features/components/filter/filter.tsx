"use client";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

export function Filter({
  setCategory,
}: {
  setCategory: (value: "default" | "profit" | "expenses") => void;
}) {
  return (
    <div className="flex items-center ml-5">
      <Select
        onValueChange={(e: "default" | "profit" | "expenses") => {
          setCategory(e);
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
            <SelectItem value="expenses">Витрати</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
