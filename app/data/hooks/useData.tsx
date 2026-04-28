"use client";

import { useEffect, useState } from "react";
import { CsvFormat } from "@/app/_utils/types";
import { useRouter } from "next/navigation";

export function useData() {
  const router = useRouter();
  const [data, setData] = useState<CsvFormat[]>([]);
  const [skippedFields, setSkippedFields] = useState<CsvFormat[]>([]);
  const [filteredData, setFilteredData] = useState<CsvFormat[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem("data");
    if (!sessionStorageData) {
      router.push("/");
      return;
    }
    const data = JSON.parse(sessionStorageData);
    setData(data.returnedData);
    setFilteredData(data.returnedData);
    setSkippedFields(data.skippedFields);
    setLoading(false);
  }, []);

  return {
    data,
    filteredData,
    setFilteredData,
    isLoading,
    setLoading,
    skippedFields,
  };
}
