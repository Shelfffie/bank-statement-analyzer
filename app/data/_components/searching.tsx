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

export function SearchByCounterpartyOrDescription({
  data,
  filteredData,
  setFilteredData,
}: {
  data: CsvFormat[];
  filteredData: CsvFormat[];
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputValue.trim() === "") return;
    if (selectedItem === "" || selectedItem === "default") return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const result = data.filter((item) =>
        item.counterparty.toLowerCase().includes(inputValue.toLowerCase())
      );
      console.log(result);

      setFilteredData(result);
    }, 2000);
  }, [inputValue, selectedItem]);

  return (
    <div className="flex flex-row justify-center items-center h-50">
      <p>Пошук</p>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />{" "}
      <Select
        onValueChange={(e) => {
          setSelectedItem(e);
          console.log(e);
        }}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Searching by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Searching by</SelectLabel>
            <SelectItem value="default">Do not searching</SelectItem>
            <SelectItem value="counterparty">Counterparty</SelectItem>
            <SelectItem value="description">Description</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
