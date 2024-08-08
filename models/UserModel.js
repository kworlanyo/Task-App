import { Schema, model } from "mongoose";
import validator from "validator";

const TaskSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["home", "work", "hobbies", "shopping", "others"],
        message: `{VALUE} is not supported and we are sad. Please choose "home", "work", "hobbies", "shopping", "others"`,
      },
    },
    descriptionInput: {
      type: String,
      required: [true, "Description input is required"],
      minLength: [1, "Description input should be more than one character long"],
    },
    priority: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [2, "Username should be more than one character long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    //* The validation for password is running in the register controller function
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email is not valid. This is from validator package",
    },
  },

  tasks: [TaskSchema],
});

const User = model("User", userSchema);

export default User;
