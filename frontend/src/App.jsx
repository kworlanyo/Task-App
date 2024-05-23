import Form from "./pages/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputsContextProvider from "./contexts/InputsContext";
import DataContextProvider from "./contexts/DataContext";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function App() {
  // We will remove the json code when we connect to backend with database
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")) || null);

  // We will remove this useEffect code when we connect to backend with database
  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <>
      <InputsContextProvider>
        <DataContextProvider>
          {!loggedInUser ? (
            <Login setLoggedInUser={setLoggedInUser} />
          ) : (
            <Routes>
              <Route path="/" element={<Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          )}
        </DataContextProvider>
      </InputsContextProvider>
    </>
  );
}

export default App;
