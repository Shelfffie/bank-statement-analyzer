import { CsvFormat } from "@/features/utils/types";
import { convertAndCheck } from "./csv-pipeline";

export const processCsvFile = async (file: File) => {
  const data: { data: CsvFormat[]; skippedFields: CsvFormat[] } =
    await convertAndCheck(file);
  const name = file.name.replace(/\.[^.]+$/, "");
  return { name, data };
};

export const saveSessionToStorage = (
  name: string,
  data: { data: CsvFormat[]; skippedFields: CsvFormat[] }
) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};

export const validateCsvFile = (file: File): boolean => {
  return file.name.endsWith(".csv");
};
