import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderList from "../HeaderList";
import { useDataTableContext } from "../../../DataTableContext";

// Mock the useDataTableContext
jest.mock("../../../DataTableContext.tsx");

describe("HeaderList Component", () => {
  const setColumnList = jest.fn();
  const mockColumnList = [
    { name: "Name", isChecked: true },
    { name: "Age", isChecked: false },
  ];

  beforeEach(() => {
    (useDataTableContext as jest.Mock).mockReturnValue({
      columnList: mockColumnList,
      setColumnList,
    });
  });

  it("renders the HeaderList component", () => {
    render(<HeaderList isChangeTheme={false} />);
    expect(screen.getByTitle("select header")).toBeInTheDocument();
  });

  it("toggles the column settings dropdown on icon click", () => {
    render(<HeaderList isChangeTheme={false} />);
    
    // Initially the dropdown should not be visible
    expect(screen.queryByText("Name")).toBeNull();

    // Open the dropdown
    fireEvent.click(screen.getByTitle("select header"));
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(screen.getByTitle("select header"));
    expect(screen.queryByText("Name")).toBeNull();//name should not be visible
  });

  it("calls setColumnList with the updated column when checkbox is clicked", () => {
    render(<HeaderList isChangeTheme={false} />);
    
    // Open the dropdown
    fireEvent.click(screen.getByTitle("select header"));

    // Click the checkbox for "Age"
    fireEvent.click(screen.getByLabelText("Age"));

    // Check if setColumnList was called with the updated column list
    expect(setColumnList).toHaveBeenCalledWith([
      { name: "Name", isChecked: true },
      { name: "Age", isChecked: true },
    ]);
  });

  it("toggles checkbox state when clicked", () => {
    render(<HeaderList isChangeTheme={false} />);
    
    // Open the dropdown
    fireEvent.click(screen.getByTitle("select header"));

    // Check the initial state of the checkbox
    expect(screen.getByLabelText("Name")).toBeChecked();

    // Click the checkbox for "Name" to uncheck it
    fireEvent.click(screen.getByLabelText("Name"));

    // Verify the setColumnList was called with updated state
    expect(setColumnList).toHaveBeenCalledWith([
      { name: "Name", isChecked: false },
      { name: "Age", isChecked: false },
    ]);
  });


});
