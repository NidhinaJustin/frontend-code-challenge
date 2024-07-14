import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import { columns, data } from "./components/DataTable/DataTableConstants";

export default function App() {
  const [isChangeTheme, setIsChangeTheme] = useState<boolean>(false);

  const handleChangeTheme=()=>{
    setIsChangeTheme(!isChangeTheme)
  }
   
  return (
    <div className={`${isChangeTheme ? "dataTableTheme" :"dataTableDefaultTheme"}`}>
      <h1>Data Table</h1>
      <DataTable data={data} columns={columns} isChangeTheme={isChangeTheme} handleChangeTheme={handleChangeTheme}/>
    </div>
  );
}
