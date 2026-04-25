"use client";

import { useEffect, useState } from "react";
import { CsvFormat } from "../_utils/types";
import { useRouter } from "next/navigation";
import { SearchByCounterpartyOrDescription } from "./_components/searching";
import { Filter } from "./_components/filter";
import DisplayAllCards from "./_components/cards/allCards";

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
    const data = JSON.parse(sessionStorageData);
    data.map(
      (item: CsvFormat) =>
        (item.type = String(item.amount).startsWith("-") ? "витрати" : "дохід")
    );
    console.log(data);
    setData(data);
    setFilteredData(data);
    setLoading(false);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center ">
      <DisplayAllCards data={filteredData} />
      <div>
        <SearchByCounterpartyOrDescription
          data={data}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <Filter data={data} setFilteredData={setFilteredData} />
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
              <td className="border-solid border-2 p-5">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
