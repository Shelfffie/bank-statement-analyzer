"use client";
import Papa from "papaparse";
import type { CsvFormat } from "../utils/types";

export default function useConvenrter() {
  const convert = (file: File): Promise<CsvFormat[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse<CsvFormat>(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed:", results.data);
          const skipEmpty = results.data.filter(
            (row) =>
              Object.keys(row).length > 0 &&
              row.date !== null &&
              row.date !== ""
          );
          resolve(skipEmpty);
        },
        error: (error) => {
          reject(error);
          return;
        },
      });
    });
  };

  return { convert };
}
