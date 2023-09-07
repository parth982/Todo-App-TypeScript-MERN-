const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todos.controller.js");

router.route("/").get(getAllTodos).post(addTodo);
router
  .route("/:id")
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById);

module.exports = router;
