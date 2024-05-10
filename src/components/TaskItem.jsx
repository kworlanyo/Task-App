/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { InputsContext } from "../contexts/InputsContext";
import { useNavigate } from "react-router-dom";

//TOOLTIP
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

//ICONS
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { MdDoneOutline } from "react-icons/md";

function TaskItem({ task }) {
  const { handleDelete, data, setData } = useContext(DataContext);
  const { setInputs } = useContext(InputsContext);
  const [check, setCheck] = useState(false);

  const [showDeleteToolTip, setShowDeleteToolTip] = useState(true); // State to manage delete tooltip visibility.

  const navigate = useNavigate();

  function handleUpdate(id) {
    setData(data.filter((taskObj) => taskObj.id !== id)); // Creates a new array of items that matches the condition. If an item does not match the condition, javascript will not add it to the new array.
    const taskToUpdate = data.find((taskObj) => taskObj.id === id); // gets the first item that matches the condition inside the function

    setInputs({
      category: taskToUpdate.category,
      descriptionInput: taskToUpdate.descriptionInput,
      priority: taskToUpdate.priority,
      date: taskToUpdate.date,
      time: taskToUpdate.time,
      id: taskToUpdate.id,
    });

    navigate("/form");
  }

  const style = {
    backgroundColor:
      task.priority && task.category === "home"
        ? "#9acfdb"
        : task.priority && task.category === "work"
        ? "#e6bac6"
        : task.priority && task.category === "hobbies"
        ? "#93cfbb"
        : task.priority && task.category === "shopping"
        ? "#ded6a6"
        : task.priority && task.category === "others"
        ? "#b5b5e8"
        : "#f9f9f9",
  };

  const style2 = {
    backgroundColor: "#f0f0f0",
  };

  return (
    <div className={check ? "completed" : "task-item-container"} style={check ? style2 : style}>
      <div className="priority-icon"> {task.priority ? "🚨" : ""}</div>
      <div className="task-item-menu">
        <div className="right">
          {showDeleteToolTip && (
            //* Use state to manage tooltip visibility with onRequestClose prop
            <Tooltip title="delete" theme="light" onRequestClose={() => setShowDeleteToolTip(false)}>
              <button
                onClick={() => {
                  handleDelete(task.id);
                  setShowDeleteToolTip(false);
                }}
              >
                <RiDeleteBin5Line title="delete" style={{ color: check ? "rgb(185, 185, 185)" : null }} />
              </button>
            </Tooltip>
          )}
          <Tooltip title="edit" theme="light">
            <button onClick={() => handleUpdate(task.id)}>
              <FaRegEdit style={{ color: check ? "rgb(185, 185, 185)" : null }} />
            </button>
          </Tooltip>
        </div>
        <div className="left">
          <Tooltip title="done?" theme="light">
            <input
              className="black-checkbox"
              type="checkbox"
              name="checkbox"
              id=""
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="task-item-display">
        <div className="schedule">
          <div>{task.date}</div>
          <div>|</div>
          <div>{task.time}</div>
        </div>
        <div className="description">{task.descriptionInput}</div>
      </div>
    </div>
  );
}

export default TaskItem;
