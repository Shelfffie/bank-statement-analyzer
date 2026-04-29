"use client";

import { CsvFormat } from "@/features/utils/types";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UsePagination(filteredData: CsvFormat[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = 20;
  const totalPages = Math.ceil(filteredData.length / perPage);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  const paginatiedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, page]);

  return { setPage, page, paginatiedData, totalPages };
}
