"use client";

import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";

const ColumnRearranger: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [rearrangedData, setRearrangedData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setCsvData(result.data);
          rearrangeColumns(result.data);
        },
      });
    }
  };

  const rearrangeColumns = (data: any[]) => {
    fetch("/fieldset_order.json")
      .then((response) => response.json())
      .then((order) => {
        const newOrder = Object.values(order) as string[];
        const rearranged = data.map((row) => {
          const newRow: { [key: string]: any } = {};
          newOrder.forEach((col) => {
            if (row.hasOwnProperty(col)) {
              newRow[col] = row[col];
            }
          });
          return newRow;
        });
        const cleanedData = cleanColumnHeaders(rearranged);
        setRearrangedData(cleanedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setLoading(false);
      });
  };

  const cleanColumnHeaders = (data: any[]) => {
    return data.map((row) => {
      const newRow: { [key: string]: any } = {};
      Object.keys(row).forEach((key) => {
        const newKey = key.replace(/^(Household|Contact|Campaign)\./, "");
        newRow[newKey] = row[key];
      });
      return newRow;
    });
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(rearrangedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName.replace(".csv", "_rearranged.csv");
    link.click();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded p-6 h-full w-full flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Column Rearranger Tool
        </h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 w-full"
        />
        {loading && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="loader"></div>
          </div>
        )}
        {!loading && csvData.length > 0 && (
          <>
            <div className="overflow-auto flex-grow mb-4">
              <table className="w-full bg-white">
                <thead>
                  <tr>
                    {Object.keys(rearrangedData[0] || {}).map((col) => (
                      <th key={col} className="py-2 px-4 border-b text-black">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rearrangedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="py-2 px-4 border-b text-black"
                        >
                          {cell as string | number | boolean | null | undefined}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={downloadCSV}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Download Rearranged CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnRearranger;
