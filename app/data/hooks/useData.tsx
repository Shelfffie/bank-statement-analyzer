"use client";

import { useEffect, useState } from "react";
import { CsvFormat } from "@/app/_utils/types";
import { useRouter } from "next/navigation";

export function useData() {
  const router = useRouter();
  const [data, setData] = useState<CsvFormat[]>([]);
  const [filteredData, setFilteredData] = useState<CsvFormat[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem("data");
    if (!sessionStorageData) {
      router.push("/");
      return;
    }
    const data = JSON.parse(sessionStorageData);
    data.map(
      (item: CsvFormat, index: number) => (
        (item.type = String(item.amount).startsWith("-") ? "витрати" : "дохід"),
        (item.id = index)
      )
    );
    setData(data);
    setFilteredData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    router.push("/data");
  }, [filteredData]);

  return { data, filteredData, setFilteredData, isLoading, setLoading };
}
