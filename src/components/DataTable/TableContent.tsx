import React from "react";
import { Table } from "react-bootstrap";
import { useDataTableContext } from "../../DataTableContext";
import { UserData } from "./DataTableTypes";

export default function TableContent() {
  const { headers, userData, setUserData, filteredData, isChangeTheme } =
    useDataTableContext();

  function handleHeaderClick(header: string) {
    let title = header as keyof UserData;
    const newdata = [...userData].sort((a, b) =>
      a[title] > b[title] ? 1 : -1
    );
    setUserData(newdata);
  }
  const getKeyName = (label: string) => {
    let key = label?.toLowerCase();
    return key as keyof UserData;
  };
  console.log(filteredData);
  
  return (
    <div className="scrollable-table">
      {headers.length ? (
        <Table className="tableContent" striped bordered hover>
          <thead>
            <tr>
              {headers.map((col, key) => (
                <th onClick={() => handleHeaderClick(col.name)} key={key}>
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
