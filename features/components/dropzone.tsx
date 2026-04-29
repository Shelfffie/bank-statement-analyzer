"use client";

import { useRef } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  processCsvFile,
  saveSessionToStorage,
  validateCsvFile,
} from "@/features/csv/csv-file-handler";

export default function Dropzone() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = async (file: File | undefined): Promise<void> => {
    if (!file) return;

    const isValid = validateCsvFile(file);
    if (!isValid) {
      alert("Файл повинен закінчуватися на csv.");
      return;
    }
    const { name, data } = await processCsvFile(file);
    saveSessionToStorage(name, data);
    router.push(`/data/${name}`);
  };

  return (
    <div>
      <Card className="w-full max-w-sm h-96 w-80 bg-gray-600">
        <CardTitle className="m-auto">Завантажіть SCV файл</CardTitle>
        <div
          onClick={() => divRef.current?.click()}
          ref={divRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col justify-center items-center h-4/5"
        >
          <CardDescription>Перетягнути</CardDescription>
        </div>
        <CardFooter className="flex flex-col justify-center items-center">
          <Input
            id="picture"
            type="file"
            accept=".csv"
            className="hidden"
            ref={inputRef}
            onChange={onChangeInput}
          />
          <Button
            variant={"default"}
            className="bg-gray-800"
            onClick={() => inputRef.current?.click()}
          >
            Завантажити
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
