import { useContext } from "react";
import DisplayTasks from "../components/DisplayTasks";
import { DataContext } from "../contexts/DataContext";

function CompletedTasks() {
  const { completedTasks } = useContext(DataContext);

  return (
    <>
      {completedTasks?.length === 0 ? (
        <h2 style={{ padding: "4rem 0", color: "gray" }}>No Completed Tasks</h2>
      ) : (
        <DisplayTasks />
      )}
    </>
  );
}

export default CompletedTasks;
