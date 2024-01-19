import express from "express";
import isAuthenticated from "../middlewares/authentication.js";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/all", isAuthenticated, getAllTasks);
router.post("/new", isAuthenticated, createNewTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
export default router;
