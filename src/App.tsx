import React from "react";
import DataTable from "./components/DataTable/DataTable";
import { columns, data } from "./components/DataTable/DataTableConstants";

export default function App() {
  return (
    <div className="App">
      <h1>Data Table</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
