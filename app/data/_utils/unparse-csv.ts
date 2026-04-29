import { CsvFormat } from "@/app/_utils/types";
import Papa from "papaparse";

export const handleExport = (filteredData: CsvFormat[]) => {
  const csv = Papa.unparse(filteredData.map(({ id, type, ...rest }) => rest));

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "filtered-data.csv";
  link.click();
  URL.revokeObjectURL(url);
};
