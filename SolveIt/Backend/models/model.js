const mongoose = require("mongoose");


// Define schema FIRST
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Create model AFTER schema
const User = mongoose.model("USER", userSchema);

module.exports = User;