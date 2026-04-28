"use client";
import { useState } from "react";
import { useData } from "../hooks/useData";
import TableComponent from "./table-comp";

export default function SkippedFields() {
  const { skippedFields } = useData();
  const [showErrors, setShowErrors] = useState<boolean>(false);
  return (
    <div>
      <h1>Пропущенно {skippedFields.length} полів</h1>
      <p className="cursor-pointer" onClick={() => setShowErrors(!showErrors)}>
        {showErrors ? "Сховати" : "Переглянути поля і причину:"}
      </p>
      <div className={showErrors ? "block" : "hidden"}>
        <TableComponent data={skippedFields} skipped={true} />
      </div>
    </div>
  );
}
