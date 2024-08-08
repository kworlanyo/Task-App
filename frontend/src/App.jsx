import Form from "./pages/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DataContext } from "./contexts/DataContext";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import TaskLayout from "./components/TaskLayout";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import UncompletedTasks from "./pages/UncompletedTasks";

function App() {
  // loggedInUser state variable is now in the DataContext.jsx so that it will be available to all components so that we avoid prop drilling to deeply nested components
  const { loggedInUser, handleHTTPRequestWithToken, setLoggedInUser, setData } = useContext(DataContext);
  const [initialLoading, setInitialLoading] = useState(true); //flag

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/users/check-auth`, {
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setLoggedInUser(user);
          setData(user.tasks);
        } else {
          setLoggedInUser(null);
          const { error } = await response.json();
          if (!initialLoading) {
            throw new Error(error.message);
          }
        }
      } catch (error) {
        if (!initialLoading) {
          alert(`Your session has expired! ${error.message}`);
        }
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 1000);
      }
    }

    checkAuthentication();
  }, []);

  if (initialLoading) {
    return (
      <div className="loading-spinner">
        <BounceLoader color={"#5f71ad"} loading={initialLoading} size={40} />
      </div>
    );
  }

  return (
    <>
      {!loggedInUser ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route element={<TaskLayout />}>
              <Route index element={<AllTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
              <Route path="uncompleted" element={<UncompletedTasks />} />
            </Route>
          </Route>
          <Route path="/form" element={<Form />} />
        </Routes>
      )}
    </>
  );
}

export default App;
