import TaskCategories from "./TaskCategories";
import TaskDescription from "./TaskDescription"; 
import TaskPriority from "./TaskPriority"; 
import TaskScheduleTime from "./TaskScheduleTime";


function Form() {


  return (
    <div>
      <h3>🔹 Create New Task 🔹</h3>
      <form action="">
        <TaskCategories /> {/* Worla */}
        <TaskDescription />  {/* Poli */}
        <TaskPriority /> {/* Poli */}
        <TaskScheduleTime /> {/* Worla */}
        <button>Add Task</button>
      </form>
    </div>
  );
}

export default Form;
