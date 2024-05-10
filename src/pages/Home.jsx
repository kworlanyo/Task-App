/* eslint-disable react/prop-types */
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import DisplayTasks from "../components/DisplayTasks";
import Navbar from "../components/Navbar";

function Home({ setLoggedInUser, loggedInUser }) {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="msg">
        <h1>Welcome to OrganizeOne 👀</h1>
        <p>Here you can keep track of your tasks!</p>
      </div> */}
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <div className="landing-page">
        <div className="button-container">
          <Button onClick={() => navigate("/form")} />
        </div>
        <DisplayTasks />
      </div>
    </>
  );
}

export default Home;
