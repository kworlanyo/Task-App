/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  console.log(data);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
