import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

router.get("/", authenticateToken);

export default router;
