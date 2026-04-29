"use client";

import { useEffect, useRef, useState } from "react";
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
  setSearch,
}: {
  setSearch: (
    value: string,
    selectedItem: "default" | "counterparty" | "description"
  ) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<
    "counterparty" | "description" | "default"
  >("default");
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSearch(inputValue, selectedItem);
    }, 500);

    //eslint-disable-next-line react-hooks/exhaustive-deps
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
