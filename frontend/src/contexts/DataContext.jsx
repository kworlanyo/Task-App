/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete the task")) {
      try {
        const response = await handleHTTPRequestWithToken(
          `http://localhost:4001/users/${loggedInUser.id}/tasks/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          setLoggedInUser(updatedUser);
          setData(updatedUser.tasks);
        } else {
          const { error } = await response.json();
          if (error.status === 401) {
            alert(error.message);
            setLoggedInUser(null);
            navigate("/");
          }
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  }

  async function handleHTTPRequestWithToken(url, settings) {
    const firstAccessResponse = await fetch(url, settings);

    if (firstAccessResponse.ok) {
      return firstAccessResponse;
    } else {
      let error;
      try {
        const responseClone = firstAccessResponse.clone();
        error = await responseClone.json();
      } catch (err) {
        console.log("Failed to parse JSON response", err);
      }

      if (error.status !== 401) {
        return firstAccessResponse;
      }

      console.log("Access Token has expired");

      const refreshResponse = await fetch("http://localhost:4001/refresh-token", { credentials: "include" });

      if (refreshResponse.ok) {
        console.log("New tokens received");

        const secondAccessResponse = await fetch(url, settings);
        return secondAccessResponse;
      } else {
        return refreshResponse;
      }
    }
  }

  return (
    <DataContext.Provider
      value={{ data, setData, handleDelete, loggedInUser, setLoggedInUser, handleHTTPRequestWithToken }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
