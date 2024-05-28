import React from "react";
import Image from "next/image";
import ColumnRearranger from "./components/ColumnRearranger";

export default function Home() {
  return (
    <main className="flex-1 items-center justify-between p-24">
          <ColumnRearranger />
    </main>
  );
}
