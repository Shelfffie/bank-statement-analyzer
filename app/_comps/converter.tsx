import Papa from "papaparse";
import type { CsvFormat, ParsedFormat } from "../_utils/types";
import { CsvSchema } from "@/schemas/csv-file";
import { fromZodError } from "zod-validation-error";

export default function useConvenrter() {
  const convert = (file: File): Promise<ParsedFormat[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse<ParsedFormat>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed:", results.data);
          const skipEmpty = results.data.filter(
            (row) => Object.keys(row).length > 0
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

  const convertAndCheck = async (file: File) => {
    const converted = await convert(file);
    const data: CsvFormat[] = converted.map((item, index) => ({
      ...item,
      type: String(item.amount).startsWith("-") ? "витрати" : "дохід",
      id: index,
      amount: item.amount === "" ? NaN : Number(item.amount),
    }));
    const returnedData: CsvFormat[] = [];
    const skippedFields: CsvFormat[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element);
      const res = CsvSchema.safeParse(element);
      if (res.success) {
        returnedData.push(res.data);
      } else {
        element.error = fromZodError(res.error, {
          prefix: "",
          includePath: false,
        }).message.slice(1);
        console.log(element.error);

        skippedFields.push(element);
      }
    }
    return { returnedData, skippedFields };
  };
  return { convertAndCheck };
}
