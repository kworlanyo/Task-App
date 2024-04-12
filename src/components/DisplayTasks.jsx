import { DataContext } from "../contexts/DataContext";
import { useContext, useEffect, useState } from "react";
import HomeCategory from "./HomeCategory";
import WorkCategory from "./WorkCategory";
import ShoppingCategory from "./ShoppingCategory";
import HobbiesCategory from "./HobbiesCategory";
import OtherCategory from "./OtherCategory";

function DisplayTasks() {
  // Get data array from DataContext
  const { data } = useContext(DataContext);

  const style = {
    display: "flex",
    gap: "2rem",
  };

  // Create state variables for each category and put them in one state object.
  const [categories, setCategories] = useState({
    home: [],
    work: [],
    shopping: [],
    hobbies: [],
    others: [],
  });

  // We want to send the input objects or tasks to each individual category state. In order to that we have to use useEffect and distribute the inputs objects or task into their respective categories.
  // We do this with the following steps:
  useEffect(() => {
    // 1. Create arrays to collect tasks for each category
    let homeTasks = [];
    let workTasks = [];
    let shoppingTasks = [];
    let hobbiesTasks = [];
    let otherTasks = [];

    // 2. Iterate through the data to categorize each task
    for (let inputObj of data) {
      if (inputObj.category === "home") {
        homeTasks.push(inputObj);
      } else if (inputObj.category === "shopping") {
        shoppingTasks.push(inputObj);
      } else if (inputObj.category === "hobbies") {
        hobbiesTasks.push(inputObj);
      } else if (inputObj.category === "work") {
        workTasks.push(inputObj);
      } else if (inputObj.category === "others") {
        otherTasks.push(inputObj);
      }
    }

    // 3. Use the categories setter function to add the arrays created in the useEffect to each state variable category
    setCategories({
      home: homeTasks,
      work: workTasks,
      shopping: shoppingTasks,
      hobbies: hobbiesTasks,
      others: otherTasks,
    });
  }, [data]); // We need the data dependency variable here. This means that the useEffect will run anytime there is an update inside the data array state variable.

  return (
    // After the input objects or tasks have been categorized, we will the send them through props to various components for them to be rendered.
    <div style={style} className="tasks-dashboard-container">
      <HomeCategory home={categories.home} />
      <WorkCategory work={categories.work} />
      <ShoppingCategory shopping={categories.shopping} />
      <HobbiesCategory hobbies={categories.hobbies} />
      <OtherCategory others={categories.others} />
    </div>
  );
}

export default DisplayTasks;
