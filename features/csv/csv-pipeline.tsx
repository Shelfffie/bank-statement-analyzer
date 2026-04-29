import Papa from "papaparse";
import type { CsvFormat, ParsedFormat } from "../utils/types";
import { CsvSchema } from "@/schemas/csv-file";
import { fromZodError } from "zod-validation-error";

const filterEmptyRows = (rowData: ParsedFormat[]) => {
  return rowData.filter((row) => Object.keys(row).length > 0);
};

export const convert = (file: File): Promise<ParsedFormat[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<ParsedFormat>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const skippedEmpty = filterEmptyRows(results.data);
        resolve(skippedEmpty);
      },
      error: (error) => {
        reject(error);
        return;
      },
    });
  });
};

const normalizeCsvRows = (convertedData: ParsedFormat[]) => {
  return convertedData.map((item, index) => ({
    ...item,
    type: String(item.amount).startsWith("-") ? "витрати" : "дохід",
    id: index,
    amount: item.amount === "" ? NaN : Number(item.amount),
  }));
};

const validateCsvRow = (el: CsvFormat) => {
  const res = CsvSchema.safeParse(el);
  if (res.success) {
    return { valid: res.data };
  }
  return {
    error: fromZodError(res.error, {
      prefix: "",
      includePath: false,
    }).message.slice(1),
    invalid: el,
  };
};

export const convertAndCheck = async (file: File) => {
  const converted = await convert(file);
  const data: CsvFormat[] = normalizeCsvRows(converted);
  const result: { data: CsvFormat[]; skippedFields: CsvFormat[] } = {
    data: [],
    skippedFields: [],
  };
  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    const validated = validateCsvRow(el);

    if ("valid" in validated && validated.valid) {
      result.data.push(validated.valid);
    } else {
      el.error = validated.error;
      result.skippedFields.push(el);
    }
  }
  return result;
};
