import { expect, test } from "vitest";
import { calculateTotal } from "./statement";

const arrTest = [
  {
    date: "2/11/2025",
    counterparty: 'ТОВ "Лямбда Сервіс"',
    description: "Оплата за обладнання",
    amount: 38400,
  },
  {
    date: "2/12/2025",
    counterparty: "Київстар",
    description: "Мобільний звʼязок",
    amount: -1200,
  },
  {
    date: "2/13/2025",
    counterparty: "ФОП Коваленко О.М.",
    description: "Консультація",
    amount: -3500,
  },
  {
    date: "2/14/2025",
    counterparty: 'ТОВ "Мю Експорт"',
    description: "Передоплата за продукцію",
    amount: 72000,
  },
  {
    date: "2/17/2025",
    counterparty: "Сільпо",
    description: "Продукти",
    amount: -1980.3,
  },
  {
    date: "2/18/2025",
    counterparty: 'ТОВ "Ню Продакшн"',
    description: "Виробничі послуги",
    amount: -21500,
  },
];

test("profit, expenses, net profit return summ", () => {
  expect(calculateTotal(arrTest, "profit")).toBe(110400);
  expect(calculateTotal(arrTest, "expenses")).toBe(-28180.3);
  expect(calculateTotal(arrTest, "net profit")).toBe(82219.7);
});
