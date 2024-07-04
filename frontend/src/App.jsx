import Form from "./pages/Form";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { DataContext } from "./contexts/DataContext";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";

function App() {
  // loggedInUser state variable is now in the DataContext.jsx so that it will be available to all components so that we avoid prop drilling to deeply nested components
  const { loggedInUser, handleHTTPRequestWithToken, setLoggedInUser, setData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await handleHTTPRequestWithToken("http://localhost:4001/users/check-auth", {
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setLoggedInUser(user);
          setData(user.tasks);
        } else {
          setLoggedInUser(null);
          navigate("/");
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(`Your session has expired! ${error.message}`);
        // setLoggedInUser(null);
        // navigate("/");
      }
    }

    checkAuthentication();
  }, []);

  return (
    <>
      {!loggedInUser ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      )}
    </>
  );
}

export default App;
