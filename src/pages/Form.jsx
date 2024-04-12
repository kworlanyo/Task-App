import TaskCategories from "../components/TaskCategories";
import TaskDescription from "../components/TaskDescription";
import TaskPriority from "../components/TaskPriority";
import TaskScheduleTime from "../components/TaskScheduleTime";
import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const { setInputs, inputs } = useContext(InputsContext);
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Adding inputs object to the data array.
    setData([...data, inputs]);

    // Navigate to the home component after the form is submitted.
    navigate("/");

    // Reset all inputs after form is submitted
    setInputs({
      category: "",
      descriptionInput: "",
      priority: false,
      date: "",
      time: "",
      id: Date.now(),
    });
  }

  return (
    <div className="form">
      <h3>Create New Task 👀 </h3>
      <form className="form-inputs" onSubmit={handleSubmit}>
        <TaskCategories />
        <TaskDescription />
        <div className="form-inputs-line">
          <TaskScheduleTime />
          <TaskPriority />
        </div>
        <button>Add Task</button>
      </form>
    </div>
  );
}

export default Form;
