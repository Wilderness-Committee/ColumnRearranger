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
    fetch("../../fieldset_order.json")
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
          Wilderness Committee Column Rearranger Tool
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

// Dataset

{
  "A": "Campaign.Campaign ID",
  "B": "Campaign",
  "C": "Campaign Member ID",
  "D": "Status",
  "E": "Contact.CRM Id",
  "F": "Contact.Deceased",
  "G": "Contact.Do Not Contact",
  "H": "Household.Mail Preferences",
  "I": "Household.Donor Portfolio",
  "J": "Contact.Primary Affiliation",
  "K": "Primary Affiliation: ID",
  "L": "Contact.Date of Last DAF Payment",
  "M": "Contact.Amount1",
  "N": "Contact.Amount2",
  "O": "Contact.Amount3",
  "P": "Contact.HA1",
  "Q": "Contact.HA2",
  "R": "Contact.HA3",
  "S": "Contact.Largest Gift",
  "T": "Contact.Largest Soft Credit Amount",
  "U": "Household.Number of Gifts Last Year",
  "V": "Household.Number of Gifts This Year",
  "W": "Household.Number of OTGs Last Year",
  "X": "Household.Number of OTGs This Year",
  "Y": "Household.Total Contributions",
  "Z": "Household.Total Gifts",
  "AA": "Household.Total Gifts Last Year",
  "AB": "Household.Total Gifts This Year",
  "AC": "Household.Total OTGs Last Year",
  "AD": "Household.Total OTGs This Year",
  "AE": "Household.Largest Gift",
  "AF": "Household.Last Gift Amount",
  "AG": "Household.Last Gift Date",
  "AH": "Household.Prior Gift Date",
  "AI": "Contact.Last Gift Amount",
  "AJ": "Contact.Last Gift Date",
  "AK": "Contact.Sustainer",
  "AL": "Contact.Last Trailblazer Gift Date",
  "AM": "Contact.NPSP Active TBZ Value",
  "AN": "Household.Last Trailblazer Gift Date",
  "AO": "Contact.First Trailblazer Gift Date",
  "AP": "Household.NPSP Active TBZ Value",
  "AQ": "Contact.CanadaHelps Recurring Gift Status",
  "AR": "Contact.Last CH Recurring Gift Date",
  "AS": "Contact.Last CH Recurring Gift Amount",
  "AT": "Household.Total Trailblazer Gifts Last 90 Days",
  "AU": "Contact.Active TBZ Amount",
  "AV": "Household.First Trailblazer Gift Date",
  "AW": "Contact.TBZ1",
  "AX": "Contact.TBZ2",
  "AY": "Contact.TBZ3",
  "AZ": "Household.Created Date",
  "BA": "Household.First Activity Date",
  "BB": "Household.Account Casesafe Id",
  "BC": "Household.Billing City",
  "BD": "Household.Billing Country",
  "BE": "Household.Billing State/Province",
  "BF": "Household.Billing State/Province Code",
  "BG": "Household.Billing Street",
  "BH": "Household.Billing Zip/Postal Code",
  "BI": "Household.Formal Greeting",
  "BJ": "Household.Household Members Summary",
  "BK": "Household.Informal Greeting",
  "BL": "Contact.Email",
  "BM": "Contact.Trailblazer Status"
}