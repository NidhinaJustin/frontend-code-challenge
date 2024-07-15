import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DataTable from "../DataTable";
import { useDataTableContext } from "../../../DataTableContext";

// Mock the DataTableContext
jest.mock("../../../DataTableContext", () => ({
  useDataTableContext: jest.fn(),
}));

describe("DataTable Component", () => {
  const mockSetPostsPerPage = jest.fn();
  const mockSetSearchKey = jest.fn();
  const mockHandleChangeTheme = jest.fn();

  beforeEach(() => {
    (useDataTableContext as jest.Mock).mockReturnValue({
      headers: [{ name: "Name" }],
      filteredData: [],
      userData: [],
      postsPerPage: 5,
      searchKey: "",
      currentPage: 1,
      setPostsPerPage: mockSetPostsPerPage,
      setSearchKey: mockSetSearchKey,
      setCurrentPage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DataTable component", () => {
    render(
      <DataTable isChangeTheme={false} handleChangeTheme={mockHandleChangeTheme} />
    );

    expect(screen.getByText("Choose page size")).toBeInTheDocument();
  });


  it("toggles theme on icon click", () => {
    render(
      <DataTable isChangeTheme={false} handleChangeTheme={mockHandleChangeTheme} />
    );

    fireEvent.click(screen.getByTitle("Change Theme"));
    expect(mockHandleChangeTheme).toHaveBeenCalled();
  });

  it("displays message when no users match the search key", () => {
    (useDataTableContext as jest.Mock).mockReturnValueOnce({
      headers: [{ name: "Name" }],
      filteredData: [],
      userData: [],
      postsPerPage: 5,
      searchKey: "nidhina",
      currentPage: 1,
      setPostsPerPage: mockSetPostsPerPage,
      setSearchKey: mockSetSearchKey,
      setCurrentPage: jest.fn(),
    });

    render(
      <DataTable isChangeTheme={false} handleChangeTheme={mockHandleChangeTheme} />
    );

    expect(screen.getByText(/No user with the key "nidhina" exists/i)).toBeInTheDocument();
  });

  it("displays message when no headers are selected", () => {
    (useDataTableContext as jest.Mock).mockReturnValueOnce({
      headers: [],
      filteredData: [],
      userData: [],
      postsPerPage: 5,
      searchKey: "",
      currentPage: 1,
      setPostsPerPage: mockSetPostsPerPage,
      setSearchKey: mockSetSearchKey,
      setCurrentPage: jest.fn(),
    });

    render(
      <DataTable isChangeTheme={false} handleChangeTheme={mockHandleChangeTheme} />
    );

    expect(screen.getByText(/Please select header from the list/i)).toBeInTheDocument();
  });
});
