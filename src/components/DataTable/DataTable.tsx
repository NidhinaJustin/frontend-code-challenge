import React from "react";
import {  Row, Col } from "react-bootstrap";
import Pagination from "../Pagination";
import { Input } from "reactstrap";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import HeaderList from "./HeaderList";
import { useDataTableContext } from "../../DataTableContext";
import TableContent from "./TableContent";

/*
Parent component which contains, user search , page size selection, theme toggle , users list table.
*/


interface DataTableProps {
  isChangeTheme:boolean
  handleChangeTheme:()=>void
}
export default function DataTable({
  isChangeTheme,
  handleChangeTheme,
}: DataTableProps) {
  const {
    headers,
    filteredData,
    userData,
    postsPerPage,
    searchKey,
    currentPage,
    setPostsPerPage,
    setSearchKey,
    setCurrentPage,
  } = useDataTableContext();

  //handling the page size and setting the data to context value.
  const handlePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(e.target.value);
    setPostsPerPage(pageSize);
  };
  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
    //Setting the search key.
  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  //updating the theme of the screen when user toggles
  const updateTheme=()=>{
    handleChangeTheme();
  }

  return (
    <>
      <div className="mb-4">
        <Row>
          <Col md={4}>
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
            <div className="labelAlignment">
              <label>Choose page size</label>
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
          <Col md={3}>
            <div className="labelAlignment">
              <label>Switch Theme</label>
              <div title="Change Theme" onClick={updateTheme}>
                {isChangeTheme ? (
                  <ToggleOnOutlinedIcon
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                ) : (
                  <ToggleOffOutlinedIcon
                    fontSize="large"
                    style={{ color: "#34495E" }}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="justify-content-center">
        <Col md={10}>
          {headers.length ? (
            <div className="scrollable-table">
              {!filteredData.length && searchKey !== "" ? (
                <div
                  className="messageBlock"
                  style={{ color: isChangeTheme ? "white" : "#34495E" }}
                >
                  <h3>{`No user with the key  "${searchKey}" exists`}</h3>
                </div>
              ) : (
                <TableContent />
              )}
            </div>
          ) : (
            <div
              className="messageBlock"
              style={{ color: isChangeTheme ? "white" : "#34495E" }}
            >
              <h3>Please select header from the list</h3>
            </div>
          )}
        </Col>
        <Col md={1}>
          <HeaderList isChangeTheme={isChangeTheme} />
        </Col>
      </Row>
      {filteredData.length>0 && headers.length>0  && (
      <Row>
        <Col md={12}>
          <Pagination
            length={userData.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            isChangeTheme={isChangeTheme}
            handlePagination={handlePagination}
          />
        </Col>
      </Row>
      )}
    </>
  );
}
