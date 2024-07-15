import React, { useState } from "react";
import { ColumnHeader } from "./DataTableTypes";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDataTableContext } from "../../DataTableContext";
import { columns } from "./DataTableConstants";

interface HeaderListProps {
  isChangeTheme: boolean;
}

export default function HeaderList({
  isChangeTheme,
}: HeaderListProps) {
  const [isColumnSettingOpen, setIsColumnSettingOpen] =
    useState<boolean>(false);
    const {
        columnList,
        setColumnList
      } = useDataTableContext();

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


  const handleSelectHeaders = () => {
    setIsColumnSettingOpen(!isColumnSettingOpen);
  };

  return (
    <div className="headerDropdown">
      <div title="select header" onClick={handleSelectHeaders}>
        <SettingsIcon style={{ color: isChangeTheme ? "white" : "#34495E" }} />
      </div>
      {isColumnSettingOpen &&
        columns.map((col, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                className="ml-2"
                name={col.name}
                checked={col["isChecked"] ?? false}
                onChange={() => handleCheckboxChange(col)}
              />
              {col.name}
            </label>
          </div>
        ))}
    </div>
  );
}


