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
  const { setData, loggedInUser } = useContext(DataContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const settings = {
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
    };

    try {
      const response = inputs.id
        ? await fetch(`http://localhost:4001/users/${loggedInUser.id}/tasks/${inputs.id}`, settings)
        : await fetch(`http://localhost:4001/users/${loggedInUser.id}/tasks`, settings);

      if (response.ok) {
        const userTasksObj = await response.json();
        setData(userTasksObj.tasks); // Set the tasks received from the server to the data state in the DataContext.jsx
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    // Navigate to the home component after the form is submitted.
    navigate("/");

    // Reset all inputs after form is submitted
    setInputs({
      category: "",
      descriptionInput: "",
      priority: false,
      date: "",
      time: "",
      // id: Date.now(), // We will now use the id created by mongo db so we don't need this id anymore
    });
  }

  async function handleGoBack() {
    try {
      const response = await fetch(`http://localhost:4001/users/${loggedInUser.id}/tasks`, { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        setData(data.tasks);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    navigate("/");

    setInputs({
      category: "",
      descriptionInput: "",
      priority: "",
      date: "",
      time: "",
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
        <button type="submit">{inputs.id ? "Update task" : "Add Task"}</button>
        <button type="button" onClick={handleGoBack}>
          Go back
        </button>
      </form>
    </div>
  );
}

export default Form;
