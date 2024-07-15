import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ColumnHeader, UserData } from "./components/DataTable/DataTableTypes";
import { columns , data } from "./components/DataTable/DataTableConstants";

interface DataTableContextProps {

  columnList: ColumnHeader[];
  userData:UserData[]
  headers: ColumnHeader[];
  currentPage:number;
  filteredData:UserData[];
  postsPerPage:number;
  searchKey:string;
  isChangeTheme:boolean;
  setColumnList: (columns: ColumnHeader[]) => void;
  setHeaders: (headers: ColumnHeader[]) => void;
  setUserData:(data:UserData[]) =>void;
  setCurrentPage:(num:number)=>void;
  setPostsPerPage:(num:number)=>void;
  setSearchKey:(key:string)=>void;
  setIsChangeTheme:(key:boolean)=>void
}

const DataTableContext = createContext<DataTableContextProps | undefined>(undefined);

export const useDataTableContext = () => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTableContext must be used within a DataTableProvider");
  }
  return context;
};

interface DataTableProviderProps {
  children: ReactNode; // Specify the type for children
}

export const DataTableProvider: React.FC<DataTableProviderProps> = ({ children }) => {

  const [columnList, setColumnList] = useState<ColumnHeader[]>(columns);
  const [headers, setHeaders] = useState<ColumnHeader[]>([]);
  const [userData, setUserData] = useState<UserData[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isChangeTheme, setIsChangeTheme] = useState<boolean>(false);


  useEffect(() => {
    const tableHeaders = columnList.filter((i) => i.isChecked === true);
    setHeaders(tableHeaders);
  }, [columnList]);

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  let filteredData = userData.slice(indexOfFirstUser, indexOfLastUser);
  if (searchKey !== "") {
    filteredData = filteredData.filter((user) => {
      return user.name.toLowerCase().includes(searchKey.toLowerCase());
    });
  }
  return (
    <DataTableContext.Provider
      value={{

        columnList,
        setColumnList,
        headers,
        setHeaders,
        userData,
        setUserData,
        currentPage,
        setCurrentPage,
        filteredData,
        postsPerPage,
        searchKey,
        setPostsPerPage,
        setSearchKey,
        isChangeTheme,
        setIsChangeTheme

      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
