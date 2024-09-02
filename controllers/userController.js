import User from "../models/UserModel.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import validator from "validator";
import he from "he";
import jwt from "jsonwebtoken";

//? The toObject() method is a Mongoose method used to convert a Mongoose document (which includes Mongoose-specific properties and methods) into a plain JavaScript object. This is useful because it removes any Mongoose-specific properties that are not needed for the JSON response, and allows for easier manipulation of the data.
//? The express-validator library is primarily designed to be used as middleware in routes to validate and sanitize incoming requests. It is not intended to be used directly in controller functions.
//? Instead, other libraries like "he" can be used for handling tasks such as unescaping HTML entities directly within your controller.

//* Function to unescape all html entities before sending the response back to the user.
function unescapeTask(user) {
  const unescapedTasks = user.tasks.map((task) => ({
    ...task.toObject(),
    descriptionInput: he.unescape(task.descriptionInput),
  }));

  return unescapedTasks;
}

//* Function to handle a user login
export async function loginController(req, res, next) {
  const { password, email } = req.body;
  try {
    // First find the user
    const foundUser = await User.findOne({ email });

    // If the user is found, send a response
    if (foundUser) {
      const matchPasswords = await bcrypt.compare(password, foundUser.password);

      if (!matchPasswords) {
        return next(createHttpError(400, "Wrong password! Please try again."));
      }

      // Tokens are created with jsonwebtokens
      const accessToken = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      };

      const accessOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
      };

      const refreshOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      };

      // The tokens are sent to the client and stored as cookies
      res.cookie("accessCookie", accessToken, accessOptions);
      res.cookie("refreshCookie", refreshToken, refreshOptions);

      res.json({
        id: foundUser._id,
        tasks: unescapeTask(foundUser),
        username: foundUser.username,
      });
    } else {
      // Return error if user is not found
      next(createHttpError(404, "No User found"));
    }
  } catch (err) {
    // Return error if the whole process fails

    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      console.log(errMessage);

      return next(createHttpError(400, errMessage));
    }

    return next(createHttpError(500, "Login Unsuccessful"));
  }
}

//* Function to handle user registration
export async function registerController(req, res, next) {
  // Destructure username, email and password from the req.body
  const { username, email, password } = req.body;

  // console.log(username, email, password);

  // If any of the fields is empty, return an error message
  if (!username || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  //* Validate password strength here before hashing
  const isPasswordStrong = validator.isStrongPassword(password);

  if (!isPasswordStrong) {
    return next(
      createHttpError(
        400,
        "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      )
    );
  }

  // If all fields are filled and the password has been validated, then try to register the user
  try {
    // First check to see if the user already exists
    const foundUser = await User.findOne({ username: username, email: email });

    // If the user already exists, return a message to specify that the user exists
    if (!foundUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // If the user does not exist, then go ahead and create a new user
      const newUser = await User.create({ email, username, password: hashedPassword });

      // Tokens are created with jsonwebtokens
      const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      };

      const accessOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
      };

      const refreshOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      };

      // The tokens are sent to the client and stored as cookies
      res.cookie("accessCookie", accessToken, accessOptions);
      res.cookie("refreshCookie", refreshToken, refreshOptions);

      // Send a response containing the user id and the username.
      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
      });
    } else {
      return next(createHttpError(409, "User already exists"));
    }
  } catch (err) {
    // Send an error message if the registration process failed
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }

    // Send an error message if there are duplicated data in the database.
    if (err.code === 11000) {
      const nameOfDuplicateField = Object.keys(err.keyPattern)[0];
      const nameOfDuplicateValue = Object.values(err.keyValue)[0];
      return next(
        createHttpError(409, `A user with this ${nameOfDuplicateField}: ${nameOfDuplicateValue} already exist`)
      );
    }
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
        tasks: unescapeTask(foundUser),
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
        tasks: unescapeTask(updatedUser),
      });
    } else {
      // Send error message if we don't find the user
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    // Send error message if the whole process fails
    console.log(error);
    next(createHttpError(500, "Could not add a new task", error));
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
        tasks: unescapeTask(foundUser),
        username: foundUser.username,
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
        tasks: unescapeTask(updatedUser),
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
          tasks: unescapeTask(foundUser),
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

export async function checkAuthentication(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(400, createHttpError("User not found, Authentication failed! Please login. From controller 🤨"));
    }

    res.json({
      id: user._id,
      tasks: unescapeTask(user),
      username: user.username,
    });
  } catch (error) {
    return next(createHttpError(500, "Authentication failed! Please login again. From server error 🤨"));
  }
}
