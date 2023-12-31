const TodoModel = require("../models/todo.model");

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find({});
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching todos." });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todoItem = await TodoModel.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json(todoItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the todo." });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodoItem = await TodoModel.create(req.body);
    res.status(201).json(newTodoItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo.", err });
  }
};

const updateTodoById = async (req, res) => {
  try {
    const { label, description } = req.body;
    const todoItem = await TodoModel.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ error: "Todo not found." });
    }
    todoItem.label = label;
    todoItem.description = description;
    const savedItem = await todoItem.save();
    res.json(savedItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo." });
  }
};

const toggleTodoStatus = async (req, res) => {
  try {
    const todoItem = await TodoModel.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ error: "Todo not found." });
    }
    todoItem.status = !todoItem.status;
    const savedItem = await todoItem.save();
    res.json(savedItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo." });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const result = await TodoModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo." });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
  toggleTodoStatus,
};
