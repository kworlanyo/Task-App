import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { NavLink, Outlet } from "react-router-dom";

function TaskLayout() {
  const { data } = useContext(DataContext);
  return (
    <>
      {data?.length > 0 && (
        <div className="tasks-layout-container">
          <nav>
            <ul>
              <li>
                <NavLink to="/" end>
                  All Tasks
                </NavLink>
              </li>
              <li>
                <NavLink to="/completed">Completed Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/uncompleted">Uncompleted Tasks</NavLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default TaskLayout;
