/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete the task")) {
      try {
        const response = await fetch(`http://localhost:4001/users/${loggedInUser.id}/tasks/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setLoggedInUser(updatedUser);
          setData(updatedUser.tasks);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  }

  return (
    <DataContext.Provider value={{ data, setData, handleDelete, loggedInUser, setLoggedInUser }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
