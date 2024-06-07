import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    descriptionInput: {
      type: String,
      required: true,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
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
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [TaskSchema],
});

const User = model("User", userSchema);

export default User;
