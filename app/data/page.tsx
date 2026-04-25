"use client";

import { useEffect, useState } from "react";
import { CsvFormat } from "../utils/types";
import { useRouter } from "next/navigation";
import { SearchByCounterpartyOrDescription } from "./components/searching";

export default function DataPage() {
  const router = useRouter();
  const [data, setData] = useState<CsvFormat[]>([]);
  const [filteredData, setFilteredData] = useState<CsvFormat[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem("data");
    if (!sessionStorageData) {
      router.push("/");
      return;
    }
    setData(JSON.parse(sessionStorageData));
    setFilteredData(JSON.parse(sessionStorageData));
    setLoading(false);
    console.log(JSON.parse(sessionStorageData));
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center ">
      <div>
        <SearchByCounterpartyOrDescription
          data={data}
          setFilteredData={setFilteredData}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="p-10">date</th>
            <th className="p-10">counterparty</th>
            <th className="p-10">description</th>
            <th className="p-10">amount</th>
            <th className="p-10">type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => (
            <tr key={index} className="border-solid border-2">
              <td className="border-solid border-2 p-5">{item.date}</td>
              <td className="border-solid border-2 p-5">{item.counterparty}</td>
              <td className="border-solid border-2 p-5">{item.description}</td>
              <td className="border-solid border-2 p-5">{item.amount}</td>
              <td className="border-solid border-2 p-5">
                {String(item.amount).startsWith("-") ? "витрати" : "дохід"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
