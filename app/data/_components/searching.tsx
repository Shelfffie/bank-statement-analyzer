"use client";

import { CsvFormat } from "@/app/_utils/types";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { searchFilter } from "../utils/statement";

export function SearchByCounterpartyOrDescription({
  data,
  setFilteredData,
}: {
  data: CsvFormat[];
  filteredData: CsvFormat[];
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<
    "counterparty" | "description" | "default"
  >("default");
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputValue.trim() === "") return;
    if (selectedItem === "default") {
      setFilteredData(data);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    searchFilter(
      inputValue,
      timer.current,
      data,
      setFilteredData,
      selectedItem
    );
  }, [inputValue, selectedItem]);

  return (
    <div className="flex flex-row justify-center items-center">
      <Select
        onValueChange={(e: "counterparty" | "description" | "default") => {
          setSelectedItem(e);
        }}
      >
        <SelectTrigger className="w-full max-w-33 rounded-sm">
          <SelectValue placeholder="Шукати за:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Шукати за:</SelectLabel>
            <SelectItem value="default">Стандарт</SelectItem>
            <SelectItem value="counterparty">Контрагент</SelectItem>
            <SelectItem value="description">Призначення</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full max-w-33 rounded-sm"
      />
    </div>
  );
}
