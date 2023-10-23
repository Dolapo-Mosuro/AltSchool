// user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String, // Store the hashed password
});

const User = mongoose.model("User", userSchema);

module.exports = User;
