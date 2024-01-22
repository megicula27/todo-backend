import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/tasks.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
config({
  path: "./data/config.env",
});
const app = express();
//middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(errorMiddleware);
export default app;
