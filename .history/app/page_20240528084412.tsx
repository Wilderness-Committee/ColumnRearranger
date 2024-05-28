import React from "react";
import Image from "next/image";
import ColumnRearranger from "./components/ColumnRearranger";

export default function Home() {
  return (
    <main className="flex flex-grow items-center justify-center w-full">
      <ColumnRearranger />
    </main>
  );
}
