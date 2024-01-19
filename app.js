import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/tasks.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
config({
  path: "./data/config.env",
});
const app = express();
//middleware

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(errorMiddleware);
export default app;
