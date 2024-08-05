const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth");
const {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  toggleTodoStatus,
} = require("../controllers/todoController");

router.post("/add", checkAuth, addTodo);
router.get("/", checkAuth, getTodos);
router.delete("/delete/:id", checkAuth, deleteTodo);
router.put("/update/:id", checkAuth, updateTodo);
router.put("/toggle-status/:id", checkAuth, toggleTodoStatus);

module.exports = router;
