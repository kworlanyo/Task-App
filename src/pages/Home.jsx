import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import DisplayTasks from "../components/DisplayTasks";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/form")} />
      <DisplayTasks />
    </div>
  );
}

export default Home;
