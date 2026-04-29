"use client";

import { SearchByCounterpartyOrDescription } from "../_components/searching";
import { Filter } from "../_components/filter";
import DisplayAllCards from "../_components/cards/allCards";
import TableComponent from "../_components/table-comp";
import { TopCounterparties } from "../_utils/calculate-top-counterparties";
import UsePagination from "../_hooks/pagination";
import { useData } from "../_hooks/useData";
import PaginationComponent from "../_components/pagination-buttons";
import { Button } from "@/components/ui/button";
import SkippedFields from "../_components/skipped-fields";
import { useParams } from "next/navigation";
import { handleExport } from "../_utils/unparse-csv";

export default function DataPage() {
  const params = useParams<{ id: string }>();

  const {
    data,
    filteredData,
    isLoading,
    setSearch,
    setCategory,
    skippedFields,
  } = useData(params.id);
  const { setPage, page, paginatiedData, totalPages } =
    UsePagination(filteredData);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center ">
      <SkippedFields skippedFields={skippedFields} />
      <DisplayAllCards data={filteredData} />
      <div className="flex flex-row justify-center item-center h-30">
        <SearchByCounterpartyOrDescription setSearch={setSearch} />
        <Filter setCategory={setCategory} />
      </div>

      <TableComponent data={paginatiedData} />
      <div>
        <PaginationComponent
          setPage={setPage}
          page={page}
          totalPages={totalPages}
        />
      </div>
      <Button onClick={() => handleExport(filteredData)}>
        Зберегти відфільтровані дані
      </Button>

      <>
        <h1 className="mt-20">5 Контрагентів за списком витрат:</h1>
        <TableComponent data={TopCounterparties(data)} />
      </>
    </div>
  );
}
