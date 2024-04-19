import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import DisplayTasks from "../components/DisplayTasks";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="msg">
        <h1>Welcome to OrganizeOne 👀</h1>
        <p>Here you can keep track of your tasks!</p>
      </div>
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
