import { expect, test } from "vitest";
import { TopCounterparties } from "./calculate-top-counterparties";

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
  {
    date: "3/4/2025",
    counterparty: 'ТОВ "Сігма Глобал"',
    description: "Оплата за консалтинг",
    amount: 52000,
  },

  {
    date: "3/5/2025",
    counterparty: "ФОП Петренко І.І.",
    description: "Канцтовари",
    amount: -1950,
  },
];

test("return top five countriparties from expenses", () => {
  expect(TopCounterparties(arrTest)).toStrictEqual([
    {
      date: "2/18/2025",
      counterparty: 'ТОВ "Ню Продакшн"',
      description: "Виробничі послуги",
      amount: -21500,
      type: "витрати",
    },
    {
      date: "2/13/2025",
      counterparty: "ФОП Коваленко О.М.",
      description: "Консультація",
      amount: -3500,
      type: "витрати",
    },
    {
      date: "2/17/2025",
      counterparty: "Сільпо",
      description: "Продукти",
      amount: -1980.3,
      type: "витрати",
    },
    {
      date: "3/5/2025",
      counterparty: "ФОП Петренко І.І.",
      description: "Канцтовари",
      amount: -1950,
      type: "витрати",
    },
    {
      date: "2/12/2025",
      counterparty: "Київстар",
      description: "Мобільний звʼязок",
      amount: -1200,
      type: "витрати",
    },
  ]);
});
