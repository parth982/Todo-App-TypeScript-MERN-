const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// GET All Todos Items
app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// GET Single Todo Item by ID
app.get("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoItem = todos.find((item) => item.id === +req.params.id);
    if (!todoItem) {
      res.status(404).send();
    } else {
      res.json(todoItem);
    }
  });
});

// POST Add Todo item
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

// PUT Update Todo Item using ID
app.put("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoItem = todos.find((item) => item.id === parseInt(req.params.id));
    if (!todoItem) {
      res.status(404).send();
    } else {
      todoItem.title = req.body.title;
      todoItem.description = req.body.description;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json(todoItem);
      });
    }
  });
});

// DELETE Todo item using ID
app.delete("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoItem = todos.find((item) => item.id === parseInt(req.params.id));
    if (!todoItem) {
      res.status(404).send();
    } else {
      const TodoIndex = todos.indexOf(todoItem);
      todos.splice(TodoIndex, 1);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

// For all Other Routes Middlware return 404
app.use((req, res, next) => {
  res.status(404).send();
});

const PORT = 3000;
app.listen(
  PORT,
  console.log(
    `Listening on Port ${PORT}\nRunning Server => \x1b[36mhttp://localhost:${PORT}\x1b[0m`
  )
);
