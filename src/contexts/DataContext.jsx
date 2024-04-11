/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [data, setData] = useState([]);

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete the task")) {
      setData(data.filter((taskObj) => taskObj.id !== id));
    }
  }

  return (
    <DataContext.Provider value={{ data, setData, handleDelete }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
