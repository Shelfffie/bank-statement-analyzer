"use client";

import { SearchByCounterpartyOrDescription } from "../../../features/components/filter/searching";
import { Filter } from "../../../features/components/filter/filter";
import DisplayAllCards from "../../../features/components/cards/allCards";
import TableComponent from "../../../features/components/table-comp";
import { getTop5 } from "../../../features/statements/calculate-top-counterparties";
import UsePagination from "../../../features/hooks/pagination";
import { useData } from "../../../features/hooks/useData";
import PaginationComponent from "../../../features/components/pagination-buttons";
import { Button } from "@/components/ui/button";
import SkippedFields from "../../../features/components/skipped-fields";
import { useParams } from "next/navigation";
import { handleExport } from "../../../features/csv/unparse-csv";

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
      {skippedFields.length > 0 && (
        <SkippedFields skippedFields={skippedFields} />
      )}
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
      <section className="w-full flex justify-end">
        <Button
          onClick={() => handleExport(filteredData)}
          className="mr-10 mt-5 rounded-sm border-gray-50"
        >
          Зберегти відфільтровані дані
        </Button>
      </section>
      <>
        <h1 className="mt-20">5 Контрагентів за списком витрат:</h1>
        <TableComponent data={getTop5(data)} />
      </>
    </div>
  );
}
