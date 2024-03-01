import TaskCategories from "./TaskCategories";
import TaskDescription from "./TaskDescription";
import TaskPriority from "./TaskPriority";
import TaskScheduleTime from "./TaskScheduleTime";

function Form() {
  return (
    <div>
      <h1>Create New Task</h1>
      <form action="">
        <TaskCategories /> {/* Worla */}
        <TaskDescription /> {/* Poli */}
        <TaskPriority /> {/* Poli */}
        <TaskScheduleTime /> {/* Worla */}
        <button>Create Task</button>
      </form>
    </div>
  );
}

export default Form;
