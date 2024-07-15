import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDataTableContext } from "../../DataTableContext";
import { UserData } from "./DataTableTypes";

export default function TableContent() {
  const { headers, filteredData, isChangeTheme ,setFilteredData } =
    useDataTableContext();
  const [order, setOrder] = useState("ASC");

  function handleHeaderClick(header: keyof UserData) {
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[header];
      const bValue = b[header];
      
      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "ASC"
          ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
          : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      }

      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "ASC" ? aValue - bValue : bValue - aValue;
      }

      return 0; // Handle cases where values are not comparable like Undefined or Null Values or comparing different Types:
    });

    setFilteredData(sortedData);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  }
  const getKeyName = (label: string) => {
    let key = label?.toLowerCase();
    return key as keyof UserData;
  };
  return (
    <div className="scrollable-table">
      {headers.length ? (
        <Table className="tableContent" striped bordered hover>
          <thead>
            <tr>
              {headers.map((col, key) => (
                <th onClick={() => handleHeaderClick(getKeyName(col.name))} key={key}>
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                {headers.map((col, key) => (
                  <td key={key}>{user[getKeyName(col.name)]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div
          className="messageBlock"
          style={{ color: isChangeTheme ? "white" : "#34495E" }}
        >
          <h3>Please select header from the list</h3>
        </div>
      )}
    </div>
  );
}
