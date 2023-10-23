const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const server = express(); // Create an Express server
const PORT = 3001; // Port number

server.use(express.static("views"));

// Define paths to HTML files
const indexPage = path.join(__dirname, "views", "index.html");
const notFoundPage = path.join(__dirname, "views", "404.html");

// Send HTML content with appropriate status code
const sendFile = async (res, file, statusCode) => {
	try {
		const fileContent = await fs.readFile(file); // Read the HTML file content
		res.setHeader("Content-Type", "text/html"); // Set the response content type to HTML
		res.status(statusCode).send(fileContent); // Send the HTML content with the specified status code
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error"); // Send a generic error response if there's an issue
	}
};

// Handling routes

server.get("/index.html", async (req, res) => {
	sendFile(res, indexPage, 200); // Send index.html with a 200 status code
});

server.get("*", async (req, res) => {
	sendFile(res, notFoundPage, 404); // Send 404.html with a 404 status code
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
