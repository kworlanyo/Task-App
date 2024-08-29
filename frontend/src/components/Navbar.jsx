/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { DataContext } from "../contexts/DataContext";
import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscChromeClose } from "react-icons/vsc";

import "../style/navbar.css";

function Navbar() {
  const { setLoggedInUser, loggedInUser } = useContext(DataContext);
  const [showDropdown, setShowDropdown] = useState(false);
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

  console.log(loggedInUser);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="box1">Organize</span>
        <span className="box2">One</span>
      </div>
      <div className="navbar-msg">
        <ul>
          <li>Welcome {loggedInUser.username} </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {showDropdown ? (
        <VscChromeClose size="3rem" className="hamburger" onClick={() => setShowDropdown(!showDropdown)} />
      ) : (
        <RxHamburgerMenu size="3rem" className="hamburger" onClick={() => setShowDropdown(!showDropdown)} />
      )}

      {showDropdown && (
        <div className="dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
