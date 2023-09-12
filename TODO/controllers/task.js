const Task = require("../model/task");

exports.newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });

    res.status(200).json({
      success: true,

      message: "task created sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMyTask = async (req, res) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    const { id } = req.params;

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(200).json({
        success: true,
        message: "invalid id",
      });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = Task.findById(req.params.id);

    if (!task) {
      return res.status(200).json({
        success: true,
        message: "invalid id",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
