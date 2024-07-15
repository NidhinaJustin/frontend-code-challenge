import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import { DataTableProvider } from "./DataTableContext";

export default function App() {
  const [isChangeTheme, setIsChangeTheme] = useState<boolean>(true);

  const handleChangeTheme=()=>{
    setIsChangeTheme(!isChangeTheme)
  }
   
  return (
    <DataTableProvider>
    <div className={`${isChangeTheme ? "dataTableTheme" :"dataTableDefaultTheme"}`}>
      <h1>Data Table</h1>
      <DataTable isChangeTheme={isChangeTheme} handleChangeTheme={handleChangeTheme}/>
    </div>
    </DataTableProvider>
  );
}


