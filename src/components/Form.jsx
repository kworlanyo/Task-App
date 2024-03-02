import TaskCategories from "./TaskCategories";
// import TaskDescription from "./TaskDescription"; //* Comment it back in when you finish creating your component😊
// import TaskPriority from "./TaskPriority"; //* Comment it back in when you finish creating your component😊
import TaskScheduleTime from "./TaskScheduleTime";

function Form() {
  return (
    <div>
      <h1>Create New Task</h1>
      <form action="">
        <TaskCategories /> {/* Worla */}
        {/* <TaskDescription /> Poli */} {/* //* Comment it back in when you finish creating your component😊 */}
        {/* <TaskPriority /> Poli */} {/* //* Comment it back in when you finish creating your component😊 */}
        <TaskScheduleTime /> {/* Worla */}
        <button>Create Task</button>
      </form>
    </div>
  );
}

export default Form;
