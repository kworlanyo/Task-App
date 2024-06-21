import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";

try {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  console.log("Database Connected");
} catch (error) {
  console.log("Error connecting to the database", error);
}

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
