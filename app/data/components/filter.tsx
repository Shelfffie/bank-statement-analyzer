"use client";

import { CsvFormat } from "@/app/utils/types";
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
  useEffect(() => {}, []);

  return (
    <div className="flex flex-row mt-15">
      <p>Філ:</p>
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
