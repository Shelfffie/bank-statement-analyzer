"use client";
import { useState } from "react";
import TableComponent from "./table-comp";
import { CsvFormat } from "@/features/utils/types";

export default function SkippedFields({
  skippedFields,
}: {
  skippedFields: CsvFormat[];
}) {
  const [showErrors, setShowErrors] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col pl-10 pt-10">
      <h1 className="!text-red-600 ">
        Пропущенно {skippedFields.length} полів
      </h1>
      <p
        className="cursor-pointer underline"
        onClick={() => setShowErrors(!showErrors)}
      >
        {showErrors ? "Сховати" : "Переглянути поля й причину:"}
      </p>
      <div className={` ${showErrors ? "block" : "hidden"}`}>
        <TableComponent data={skippedFields} skipped={true} />
      </div>
    </div>
  );
}
