import User from "../models/UserModel.js";
import createHttpError from "http-errors";

export async function loginController(req, res, next) {
  let foundUser;

  try {
    foundUser = await User.findOne(req.body);
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (foundUser) {
    res.json({
      id: foundUser._id,
      tasks: foundUser.tasks,
      username: foundUser.username,
    });
  } else {
    next(createHttpError(401, "Login Unsuccessful"));
  }
}

export async function registerController(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  let foundUser;

  try {
    foundUser = await User.findOne({ username: username, email: email });
  } catch (error) {
    return next(createHttpError(500, "Server Error"));
  }

  if (foundUser) {
    return next(createHttpError(409, "User already exists"));
  }

  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
    });
  } catch (error) {
    next(createHttpError(500, "Server error"));
  }
}
