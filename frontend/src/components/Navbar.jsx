/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

function Navbar({ setLoggedInUser, loggedInUser }) {
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
