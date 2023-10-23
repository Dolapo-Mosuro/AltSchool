const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require("../config/db");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// Create Express application
const app = express();

// Define a simple route
app.get("/", (req, res) => {
	res.send("Hello, Express!");
});

// Configure EJS as your template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Set up middleware for body parsing and cookies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/protected", checkAuth, (req, res) => {
	res.json({ message: "This is a protected route" });
});

// Register and Login routes
app.post("/register", registerUser);
app.post("/login", loginUser);

// In your app.js or server.js
app.use((err, req, res, next) => {
	// Handle errors here
	console.error(err);

	if (res.headersSent) {
		return next(err);
	}

	res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
