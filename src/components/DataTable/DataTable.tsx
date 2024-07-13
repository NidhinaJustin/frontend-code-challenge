import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { ColumnHeader, UserData ,SortTypes } from "./DataTableTypes";
import SettingsIcon from "@mui/icons-material/Settings";
import Pagination from "../Pagination";
import { Input } from "reactstrap";

interface DataTableProps {
  data: UserData[];
  columns: ColumnHeader[];
}
export default function DataTable({ data, columns }: DataTableProps) {
  const [isColumnSettingOpen, setIsColumnSettingOpen] =
    useState<boolean>(false);
    const [userData, setUserData] =useState<UserData[]>(data)
  const [columnList, setColumnList] = useState<ColumnHeader[]>(columns);
  const [headers, setHeaders] = useState<ColumnHeader[]>(columns);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const tableHeaders = columnList.filter((i) => i.isChecked === true);
    setHeaders(tableHeaders);
  }, [columnList]);

  const getKeyName = (label: string) => {
    let key = label?.toLowerCase();
    return key as keyof UserData;
  };

  const handleSelectHeaders = () => {
    setIsColumnSettingOpen(!isColumnSettingOpen);
  };

  const handleCheckboxChange = (column: ColumnHeader) => {
    let headerList = [...columnList];
    let header = column;
    header.isChecked = header.isChecked ? !header.isChecked : true;
    const index = headerList.findIndex((item) => item.name === column.name);
    if (index !== -1) {
      headerList[index] = header;
    }
    setColumnList(headerList);
  };
  const handlePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(e.target.value);
    setPostsPerPage(pageSize);
  };

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  let filteredData = userData.slice(indexOfFirstUser, indexOfLastUser);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  if (searchKey !== "") {
    filteredData = filteredData.filter((user) => {
      return user.name.toLowerCase().includes(searchKey.toLowerCase());
    });
  }

  function handleHeaderClick(header:string) {
    let title= header as keyof UserData
    const newdata = [...userData].sort((a, b) => (a[title] > b[title] ? 1 : -1));
    setUserData(newdata);
  }

  return (
    <>
      <Row>
        <Col md={7}>
          <div className="searchBar">
            {userData.length && (
              <Input
                className="w-50"
                type="text"
                name="searchKey"
                value={searchKey}
                onChange={handleSearchUser}
                placeholder="Search users..."
              />
            )}
          </div>
        </Col>
        <Col md={4}>
          <div className="labelInputContainer ">
            <label>Select page size</label>
            <Input
              id="postsPerPage"
              type="select"
              name="postsPerPage"
              value={postsPerPage}
              onChange={handlePageSize}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Input>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10}>
          <Table className="tableContent" striped bordered hover>
            <thead>
              <tr>
                {headers.map((col, key) => (
                  <th onClick={()=>handleHeaderClick(col.name)} key={key}>{col.name}</th>
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
        </Col>
        <Col md={1}>
          <div title="select header" onClick={handleSelectHeaders}>
            <SettingsIcon color="primary" />
          </div>
          {isColumnSettingOpen && (
            <div className="headerDropdown">
              {columns.map((col, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      name={col.name}
                      checked={col["isChecked"] ?? false}
                      onChange={() => handleCheckboxChange(col)}
                    />
                    {col.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Pagination
            length={userData.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </Col>
      </Row>
    </>
  );
}
