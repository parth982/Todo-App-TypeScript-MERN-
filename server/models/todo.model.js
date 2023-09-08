const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);
module.exports = TodoModel;
