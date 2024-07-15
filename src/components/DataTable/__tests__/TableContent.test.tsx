import React from "react";
import { render, screen } from "@testing-library/react";
import TableContent from "../TableContent";
import { useDataTableContext } from "../../../DataTableContext";

jest.mock("../../../DataTableContext");


const mockContextValue = {
  headers: [{ name: "Name" }, { name: "Age" }],
  filteredData: [
    { Name: "Alice", Age: 30 },
    { Name: "Bob", Age: 25 },
  ],
  isChangeTheme: false,

};

beforeEach(() => {
  (useDataTableContext as jest.Mock).mockReturnValue(mockContextValue);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("TableContent Component", () => {
  it("renders the table with headers and data", () => {
    render(<TableContent />);
    
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("displays a message when no headers are present", () => {
    (useDataTableContext as jest.Mock).mockReturnValue({
      ...mockContextValue,
      headers: [],
    });

    render(<TableContent />);

    expect(screen.getByText(/please select header from the list/i)).toBeInTheDocument();
  });
});
