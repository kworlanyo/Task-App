/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLoggedInUser }) {
  // State to check all inputs here
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // state to check if user wants to register
  const [isToRegister, setIsToRegister] = useState(false);

  // initialize useNavigate hook
  const navigate = useNavigate();

  // function to handle inputs
  function handleChange(e) {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  }

  // function to run when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();

    // We will change this. But for now, we are hardcoding and checking to log the user in the app
    if (loginInputs.email === "poli@gmail.com" && loginInputs.password === "1234") {
      setLoggedInUser({
        username: "Poli",
        email: "poli@gmail.com",
        password: "1234",
      });

      navigate("/");
    }
  }

  return (
    <div className="login-page">
      <div>
        <h1>Welcome to OrganizeOne 👀</h1>
        <p>Here you can keep track of your tasks!</p>
      </div>
      {/* We create a dynamic form to handle both register and login scenarios */}
      <form onSubmit={handleSubmit}>
        {isToRegister ? <h3>Register</h3> : <h3>Login</h3>}
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
        {isToRegister ? (
          <p>
            Already have an account? <span onClick={() => setIsToRegister(false)}>Login</span>
          </p>
        ) : (
          <p>
            Don't have an account? <span onClick={() => setIsToRegister(true)}>Register here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
