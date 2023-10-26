const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

export const todos = mongoose.models.todo || mongoose.model("todo", todoSchema);
