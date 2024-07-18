import { Router } from "express";
import {
  loginController,
  registerController,
  getAllTasks,
  addNewTask,
  deleteTask,
  updateTask,
  updateTaskDone,
  checkAuthentication,
} from "../controllers/userController.js";
import { body } from "express-validator";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

// We sanitize the data email and username inputs before the controller processes the data.
router.post("/register", [body("email").normalizeEmail().trim(), body("username").escape().trim()], registerController);
router.post("/login", loginController);

router.use(authenticateToken);
router.get("/:id/tasks", getAllTasks);
// We sanitize the descriptionInput data before the task is added to the user in the controller.
router.patch("/:id/tasks/", [body("descriptionInput").escape().trim()], addNewTask);
router.delete("/:id/tasks/:taskId", deleteTask);
// We sanitize the descriptionInput data before the task is updated in the user in the controller.
router.patch("/:id/tasks/:taskId", [body("descriptionInput").escape().trim()], updateTask);
router.patch("/:id/tasks/:taskId/done", updateTaskDone);
router.get("/check-auth", checkAuthentication);

export default router;
