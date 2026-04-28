import z from "zod";

export const CsvSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Невалідна дата"),
  counterparty: z.string("Невалідний формат даних").trim().min(1, "Пусте поле"),
  description: z.string("Невалідний формат даних").trim().min(1, "Пусте поле"),
  amount: z.number("Невалідний формат даних"),
  id: z.number("Невалідний формат даних").optional(),
  type: z.enum(["дохід", "витрати"]).optional(),
});
