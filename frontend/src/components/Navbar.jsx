/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import "../style/navbar.css";

function Navbar() {
  const { setLoggedInUser, loggedInUser } = useContext(DataContext);
  async function handleLogout() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/logout`, { method: "POST", credentials: "include" });

      if (response.ok) {
        const { message } = await response.json();
        alert(message);
        setLoggedInUser(null);
        <Navigate to={<Login />} />;
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  return (
    <nav className="navbar">
      <ul>
        <li>Welcome {loggedInUser.username} </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
