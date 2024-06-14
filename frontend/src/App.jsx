import Form from "./pages/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DataContext } from "./contexts/DataContext";
import Login from "./pages/Login";
import { useContext } from "react";

function App() {
  // loggedInUser state variable is now in the DataContext.jsx so that it will be available to all components so that we avoid prop drilling to deeply nested components
  const { loggedInUser } = useContext(DataContext);

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
