import { useContext } from "react";
import DisplayTasks from "../components/DisplayTasks";
import { DataContext } from "../contexts/DataContext";

function UncompletedTasks() {
  const { uncompletedTasks } = useContext(DataContext);
  return (
    <>
      {uncompletedTasks?.length === 0 ? (
        <h2 style={{ padding: "4rem 0", color: "gray" }}>No uncompleted Tasks</h2>
      ) : (
        <DisplayTasks />
      )}
    </>
  );
}

export default UncompletedTasks;
