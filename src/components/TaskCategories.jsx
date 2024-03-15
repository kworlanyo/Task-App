import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskCategories() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <select name="category" id="" onChange={handleChange} value={inputs.category}>
        <option disabled value="">
          Choose Category
        </option>
        <option value="home">Home</option>
        <option value="work">Work</option>
        <option value="hobbies">Hobbies</option>
        <option value="shopping">Shopping</option>
      </select>
      {/* <h2>{category}</h2> */}
    </>
  );
}

export default TaskCategories;
