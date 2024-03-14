import TaskCategories from "../components/TaskCategories";
import TaskDescription from "../components/TaskDescription";
import TaskPriority from "../components/TaskPriority";
import TaskScheduleTime from "../components/TaskScheduleTime";
import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function Form() {
  const { setInputs } = useContext(InputsContext);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h3>🔹 Create New Task 🔹</h3>
      <form action="">
        <TaskCategories />
        <TaskDescription />
        <TaskPriority />
        <TaskScheduleTime />
        <button>Add Task</button>
      </form>
    </div>
  );
}

export default Form;
