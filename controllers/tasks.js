import Tasks from "../models/tasks.js";
import errorHandler from "../middlewares/error.js";

export const createNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Tasks.create({
      title,
      description,
      user: req.user,
    });

    res.status(200).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
      next(new errorHandler("Task Not Found!", 404));
    }

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
      next(new errorHandler("Task Not Found!", 404));
    }

    await Tasks.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
