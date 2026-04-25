"use client";

import { CsvFormat } from "@/app/_utils/types";
import React, { useEffect, useRef, useState } from "react";
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
  data,
  setFilteredData,
}: {
  data: CsvFormat[];
  setFilteredData: React.Dispatch<React.SetStateAction<CsvFormat[]>>;
}) {
  const filterByItem = (e: string) => {
    if (e === "default") {
      setFilteredData(data);
    } else if (e === "profit") {
      setFilteredData(
        data.filter((item) => !String(item.amount).startsWith("-"))
      );
    } else {
      setFilteredData(
        data.filter((item) => String(item.amount).startsWith("-"))
      );
    }
  };

  return (
    <div className="flex flex-row mt-15">
      <p>Фільтр:</p>
      <Select
        onValueChange={(e) => {
          filterByItem(e);
          console.log(e);
        }}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Searching by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter by type</SelectLabel>
            <SelectItem value="default">Default state</SelectItem>
            <SelectItem value="profit">Profit</SelectItem>
            <SelectItem value="exprenses">Expenses</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
