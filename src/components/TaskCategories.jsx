import { useState } from "react";

function TaskCategories() {
  const [category, setCategory] = useState("");
  return (
    <>
      <select name="categories" id="" onChange={(e) => setCategory(e.target.value)}>
        <option value="home">Home</option>
        <option value="work">Work</option>
        <option value="hobbies">Hobbies</option>
        <option value="shopping">Shopping</option>
      </select>
      <h2>{category}</h2>
    </>
  );
}

export default TaskCategories;
