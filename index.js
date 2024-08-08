import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import axios from "axios";

try {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  console.log("Database Connected");
} catch (error) {
  console.log("Error connecting to the database", error);
}

const app = express();

app.use(cookieParser());
app.use(express.json());

// In the backend, we write credentials: true in the cors function but in the frontend, we write credentials: "include" in the settings object anytime we are sending a request.
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://task-app-984b.onrender.com"],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/users", userRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use("/logout", logoutRouter);

// Create a ping endpoint
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Schedule a task to ping the server every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    await axios.get("https://task-app-984b.onrender.com/ping");
    console.log("Ping successful");
  } catch (error) {
    console.error("Error pinging the server:", error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
