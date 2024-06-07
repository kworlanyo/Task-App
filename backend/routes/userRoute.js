import { Router } from "express";
import {
  loginController,
  registerController,
  getAllTasks,
  addNewTask,
  deleteTask,
  updateTask,
  updateTaskDone,
} from "../controllers/userController.js";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/:id/tasks", getAllTasks);
router.patch("/:id/tasks/", addNewTask);
router.delete("/:id/tasks/:taskId", deleteTask);
router.patch("/:id/tasks/:taskId", updateTask);
router.patch("/:id/tasks/:taskId/done", updateTaskDone);

export default router;
