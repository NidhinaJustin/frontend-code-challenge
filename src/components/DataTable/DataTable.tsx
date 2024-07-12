import React from 'react';
import { Table } from 'react-bootstrap';
import { ColumnHeader, UserData } from './DataTableTypes';

interface DataTableProps {
  data: UserData[]; 
  columns: ColumnHeader[]; 
}
export default function DataTable({ data, columns }: DataTableProps) {
  // Apply pagination and search filters

  const getKeyName=(label:string)=>{
    let key= label.toLowerCase();
    return key as keyof UserData
  }

  const filteredData = data
  return (
    <div className="">

    <Table striped bordered hover >
      <thead>
        <tr>
          {columns.map((col,key) => (
            <th key={key} >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <tr key={index}>
            {columns.map((col, key) => (
              <td key={key}>{user[getKeyName(col.label)]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  )
}

