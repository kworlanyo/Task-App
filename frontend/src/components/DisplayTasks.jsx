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
    //1. Create an object to store tasks for each category
    const allTasksCategories = {
      home: [],
      work: [],
      shopping: [],
      hobbies: [],
      others: [],
    };

    // 2. Loop and categorize the tasks based on their category and priority
    data?.forEach((inputObj) => {
      const tasksArray = allTasksCategories[inputObj.category]; // eg. allTasksCategory["home"]

      tasksArray.push(inputObj);

      tasksArray.sort((a, b) => {
        if (a.priority && !b.priority) {
          return -1; // Task with priority true comes before task with priority false
        } else if (!a.priority && b.priority) {
          return 1; // Task with priority false comes after task with priority true
        } else {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; // Sort by date if both tasks have the same priority
        }
      });
    });

    // 3. Use the categories setter function to add the arrays created in the useEffect to each state variable category
    setCategories(allTasksCategories);
  }, [data]); // We need the data dependency variable here. This means that the useEffect will run anytime there is an update inside the data array state variable.

  return (
    // After the input objects or tasks have been categorized, we will the send them through props to various components for them to be rendered.
    <div className="tasks-dashboard-container">
      <HomeCategory home={categories.home} />
      <WorkCategory work={categories.work} />
      <ShoppingCategory shopping={categories.shopping} />
      <HobbiesCategory hobbies={categories.hobbies} />
      <OtherCategory others={categories.others} />
    </div>
  );
}

export default DisplayTasks;
