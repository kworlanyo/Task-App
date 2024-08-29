/* eslint-disable react/prop-types */
import Button from "../components/Button";
import { Outlet, useNavigate } from "react-router-dom";
// import DisplayTasks from "../components/DisplayTasks";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import noTasksImage from "../assets/undraw_No_data_re_kwbl (1).png";

function Home() {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="button-container">
          <Button onClick={() => navigate("/form")} />
        </div>
        {data?.length === 0 ? (
          <div className="no-task-container">
            <img src={noTasksImage} alt="" />
            <p>There are no tasks yet 😊</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Home;
