/* eslint-disable react/prop-types */
import Button from "../components/Button";
import { Outlet, useNavigate } from "react-router-dom";
// import DisplayTasks from "../components/DisplayTasks";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="button-container">
          <Button onClick={() => navigate("/form")} />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
