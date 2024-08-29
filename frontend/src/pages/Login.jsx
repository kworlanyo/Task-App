/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import "../style/login.css";

function Login() {
  // State to check all inputs here
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // state to check if user wants to register
  const [isToRegister, setIsToRegister] = useState(false);
  const { setLoggedInUser, setData } = useContext(DataContext);

  // initialize useNavigate hook
  const navigate = useNavigate();

  // function to handle inputs
  function handleChange(e) {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  }

  // function to run when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();

    // Since we are doing conditional request, we first declare a variable to contain the object we are sending
    let user;

    // If isToRegister is true, it means the user is registering so we send an object that includes the username field
    // If isToRegister is false, it means the user is logging in so we don't add the username field
    if (isToRegister) {
      user = {
        username: loginInputs.username,
        email: loginInputs.email,
        password: loginInputs.password,
      };
    } else {
      user = {
        email: loginInputs.email,
        password: loginInputs.password,
      };
    }

    const settings = {
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    };

    // If isToRegister is true, we send the request to the register route, if isToRegister is false, then we send the request to the login route
    try {
      const response = await fetch(
        isToRegister ? `${import.meta.env.VITE_API}/users/register` : `${import.meta.env.VITE_API}/users/login`,
        settings
      );

      if (response.ok) {
        const userData = await response.json();

        setLoggedInUser(userData); // We set the loggedInUser in the DataContext.jsx with the userData from the server
        setData(userData.tasks); // We also set the data state variable in the DataContext.jsx with the tasks array from the userData from the server.
        navigate("/"); // We then navigate back to the home page.
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    setLoginInputs({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="welcome-and-login-page">
      <div className="login-page">
        <div className="welcome-container">
          <h1>
            Welcome to <span className="box1">Organize</span>
            <span className="box2">One</span>
          </h1>
          <p>Here you can keep track of your tasks!</p>
        </div>
        <div className="login-container">
          <div className="form-container">
            <h1>{isToRegister ? "Register" : "Login"} </h1>
            <form onSubmit={handleSubmit}>
              {isToRegister && (
                <label>
                  Username
                  <input type="text" name="username" value={loginInputs.username} onChange={handleChange} required />
                </label>
              )}
              <label>
                Email
                <input type="email" name="email" value={loginInputs.email} onChange={handleChange} required />
              </label>
              <label>
                Password
                <input type="password" name="password" value={loginInputs.password} onChange={handleChange} required />
              </label>
              <button>{isToRegister ? "Register" : "Login"}</button>
            </form>
            <p>
              {isToRegister ? (
                <>
                  Already have an account? <span onClick={() => setIsToRegister(false)}>Login</span>
                </>
              ) : (
                <>
                  Don't have an account? <span onClick={() => setIsToRegister(true)}>Register here</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
