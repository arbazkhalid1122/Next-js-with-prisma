const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  loginWith: {
    type: Boolean,
  },
});

export const NewUsers =
  mongoose.models.user || mongoose.model("user", newUserSchema);
