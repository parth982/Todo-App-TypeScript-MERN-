const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
  toggleTodoStatus,
} = require("../controllers/todos.controller.js");

router.route("/").get(getAllTodos).post(addTodo);
router
  .route("/:id")
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById)
  .patch(toggleTodoStatus);

module.exports = router;
