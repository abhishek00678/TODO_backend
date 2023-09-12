const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
    required: true,
  },
  ceratedAt: {
    type: Date,
    default: Date.now,
  },
});

const task = mongoose.model("task", schema);
module.exports = task;
