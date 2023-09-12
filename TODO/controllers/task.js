const Task = require("../model/task");

exports.newTask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({ title, description, user: req.user });

  res.status(200).json({
    success: true,

    message: "task created sucessfully",
  });
};

exports.getMyTask = async (req, res) => {
  const userid = req.user._id;
  const tasks = await Task.find({ user: userid });
  const { id } = req.params;

  res.status(200).json({
    success: true,
    tasks,
  });
};

exports.updateTask = async (req, res) => {
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
};

exports.deleteTask = async (req, res) => {
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
};
