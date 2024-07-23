import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import logoutRouter from "./routes/logoutRoute.js";

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
    origin: "http://localhost:5173",
  })
);

app.use("/users", userRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use("/logout", logoutRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
