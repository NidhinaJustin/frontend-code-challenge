import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDataTableContext } from "../../DataTableContext";
import { UserData } from "./DataTableTypes";

/*
TableCOntent is to display the users info.
When user clicks on the header of table , the column will getsorted
*/

export default function TableContent() {
  const { headers, filteredData, isChangeTheme ,setFilteredData } =
    useDataTableContext();
  const [sortOrder, setSortOrder] = useState<string>("ASC");

//Handling the sort functionality of the header
  function handleHeaderClick(header: keyof UserData) {
    const sortedData = [...filteredData].sort((a, b) => {
      const firstValue = a[header];
      const secondValue = b[header];
      
      // Handle case where the values are of data type  string.
      if (typeof firstValue === "string" && typeof secondValue === "string") {
        return sortOrder === "ASC"
          ? firstValue.toLowerCase().localeCompare(secondValue.toLowerCase())
          : secondValue.toLowerCase().localeCompare(firstValue.toLowerCase());
      }

      // Handling case where valuesof data type number.
      if (typeof firstValue === "number" && typeof secondValue === "number") {
        return sortOrder === "ASC" ? firstValue - secondValue : secondValue - firstValue;
      }
    // Handle cases where values are not comparable like Undefined or Null Values or comparing different Types:
      return 0; 
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  }
  //Converting the string to lowecase.
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
