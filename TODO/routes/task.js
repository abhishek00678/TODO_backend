const express = require("express");
const { isAuthenticated } = require("../middelware/auth");
const {
  newTask,
  getMyTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

const router = express.Router();

router.post("/");
router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
