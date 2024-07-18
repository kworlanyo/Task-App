/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import "../style/navbar.css"

function Navbar() {
  const { setLoggedInUser, loggedInUser } = useContext(DataContext);
  function handleLogout() {
    <Navigate to={<Login />} />;
    setLoggedInUser(null);
  }

  return (
    <nav>
      <ul>
        <li>Welcome {loggedInUser.username} </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
