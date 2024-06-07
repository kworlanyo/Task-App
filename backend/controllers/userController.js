import User from "../models/UserModel.js";
import createHttpError from "http-errors";

//* Function to handle a user login
export async function loginController(req, res, next) {
  try {
    // First find the user
    const foundUser = await User.findOne(req.body);

    // If the user is found, send a response
    if (foundUser) {
      res.json({
        id: foundUser._id,
        tasks: foundUser.tasks,
        username: foundUser.username,
      });
    } else {
      // Return error if user is not found
      next(createHttpError(404, "No User found"));
    }
  } catch (error) {
    // Return error if the whole process fails
    return next(createHttpError(500, "Login Unsuccessful"));
  }
}

//* Function to handle user registration
export async function registerController(req, res, next) {
  // Destructure username, email and password from the req.body
  const { username, email, password } = req.body;

  // If any of the fields is empty, return an error message
  if (!username || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  // If all fields are filled, then try to register the user
  try {
    // First check to see if the user already exists
    const foundUser = await User.findOne({ username: username, email: email });

    // If the user already exists, return a message to specify that the user exists
    if (foundUser) {
      return next(createHttpError(409, "User already exists"));
    }

    // If the user does not exist, then go ahead and create a new user
    const newUser = await User.create(req.body);

    // Send a response containing the user id and the username.
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
    });
  } catch (error) {
    // Send an error message if the registration process failed
    next(createHttpError(500, "Registration Unsuccessful"));
  }
}

//* Function to get all tasks of a user
export async function getAllTasks(req, res, next) {
  // Destructure the id parameter of the user from req.params
  const { id } = req.params;

  try {
    // First find the user
    const foundUser = await User.findById(id);

    // If the user is found, then send a response that includes the tasks of the user.
    if (foundUser) {
      res.json({
        id: foundUser._id,
        tasks: foundUser.tasks,
        username: foundUser.username,
      });
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "No User found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    next(createHttpError(500, "Failed to get all tasks"));
  }
}

//* Function to add new task
export async function addNewTask(req, res, next) {
  // Destructure the id parameter of the user from req.params
  const { id } = req.params;

  try {
    // First find the user
    const foundUser = await User.findById(id);

    // If the user is found...
    if (foundUser) {
      // Create an options object
      const options = {
        new: true,
        runValidators: true,
      };

      // Update the user by pushing a new task into the tasks array of the user object
      const updatedUser = await User.findByIdAndUpdate(id, { $push: { tasks: req.body } }, options);

      // Send a response containing the tasks array
      res.status(201).json({
        tasks: updatedUser.tasks,
      });
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    next(createHttpError(500, "Could not add a new task"));
  }
}

//* Function to delete a Task
export async function deleteTask(req, res, next) {
  // Destructure the id parameter of the user and the taskId parameter of the task from req.params
  const { id, taskId } = req.params;

  try {
    // First find the user
    const foundUser = await User.findById(id);

    // If the user is found...
    if (foundUser) {
      // Use the filter method to create a new array that does not include the task to be deleted and store new array in foundUser.tasks
      foundUser.tasks = foundUser.tasks.filter((task) => task._id.toString() !== taskId);
      await foundUser.save(); // Save the changes in the User

      // Send a response that includes the updated tasks array of the user
      res.json({
        id: foundUser._id,
        tasks: foundUser.tasks,
      });
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    next(createHttpError(500, "Could not delete task"));
  }
}

//* Function to update a task
export async function updateTask(req, res, next) {
  // Destructure the id parameter of the user and the taskId parameter of the task from req.params
  const { taskId, id } = req.params;

  try {
    // First find the user
    const foundUser = await User.findById(id);

    // If the user is found...
    if (foundUser) {
      // First filter out the task that needs to be updated
      foundUser.tasks = foundUser.tasks.filter((task) => task._id.toString() !== taskId);
      await foundUser.save(); // Save the changes in the User

      // Then create an options object
      const options = {
        new: true,
        runValidators: true,
      };

      // Then push the updated task into the tasks array of the user.
      const updatedUser = await User.findByIdAndUpdate(id, { $push: { tasks: req.body } }, options);

      // Send a response that includes the updated tasks array of the user
      res.status(201).json({
        tasks: updatedUser.tasks,
      });
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    next(createHttpError(500, "Could not update task"));
  }
}

//* Function to update the user if the task is done
export async function updateTaskDone(req, res, next) {
  // Destructure the id parameter of the user and the taskId parameter of the task from req.params
  const { id, taskId } = req.params;
  // Destructure the check variable coming from the frontend in req.body
  const { check } = req.body;

  try {
    // First find the user
    const foundUser = await User.findById(id);

    // If the user is found...
    if (foundUser) {
      // Find the id of the task and store it in a task variable
      const task = foundUser.tasks.id(taskId);

      // If the task is found...
      if (task) {
        // Update the "done" property of the task with the boolean value in the "check" variable from the frontend
        task.done = check;

        await foundUser.save(); // Save the changes to the User

        // Send a response that includes the updated tasks array of the user
        res.json({
          tasks: foundUser.tasks,
        });
      } else {
        // Send error message if no task is found
        return next(createHttpError(404, "No task found"));
      }
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "No user found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    next(createHttpError(500, "Task could not be checked"));
  }
}
