/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  // we will remove the json code when we add backend with database.
  const [data, setData] = useState(JSON.parse(localStorage.getItem("tasks2")) || []);

  console.log(data);

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete the task")) {
      setData(data.filter((taskObj) => taskObj.id !== id));
    }
  }

  // We will change when we start using the backend with database
  useEffect(() => {
    localStorage.setItem("tasks2", JSON.stringify(data));
  });

  return <DataContext.Provider value={{ data, setData, handleDelete }}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
