import React from "react";
import Image from "next/image";
import ColumnRearranger from "./components/ColumnRearranger";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <ColumnRearranger />
    </main>
  );
}
