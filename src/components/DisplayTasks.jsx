import { DataContext } from "../contexts/DataContext";
import { useContext, useEffect, useState } from "react";
import HomeCategory from "./HomeCategory";
import WorkCategory from "./WorkCategory";
import ShoppingCategory from "./ShoppingCategory";
import HobbiesCategory from "./HobbiesCategory";

function DisplayTasks() {
  // Get data array from DataContext
  const { data } = useContext(DataContext);

  // Create state variables for each category and put them in one state object.
  const [categories, setCategories] = useState({
    home: [],
    work: [],
    shopping: [],
    hobbies: [],
  });

  // We want to send the input objects or tasks to each individual category state. In order to that we have to use useEffect and distribute the inputs objects or task into their respective categories.
  // We do this with the following steps:
  useEffect(() => {
    // 1. Create arrays to collect tasks for each category
    let homeTasks = [];
    let workTasks = [];
    let shoppingTasks = [];
    let hobbiesTasks = [];

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
      }
    }

    // 3. Use the categories setter function to add the arrays created in the useEffect to each state variable category
    setCategories({
      home: homeTasks,
      work: workTasks,
      shopping: shoppingTasks,
      hobbies: hobbiesTasks,
    });
  }, [data]); // We need the data dependency variable here. This means that the useEffect will run anytime there is an update inside the data array state variable.

  return (
    // After the input objects or tasks have been categorized, we will the send them through props to various components for them to be rendered.
    <div>
      <HomeCategory home={categories.home} />
      <WorkCategory work={categories.work} />
      <ShoppingCategory shopping={categories.shopping} />
      <HobbiesCategory hobbies={categories.hobbies} />
    </div>
  );
}

export default DisplayTasks;
