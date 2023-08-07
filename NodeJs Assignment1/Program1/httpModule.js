const http = require("http");

const PORT = 3000;

// Create an http server
const server = http.createServer((req, res) => {
	// Set the response header
	res.writeHead(200, { "Content-Type": "text/plain" });
});

// Return “Hello world” from the response
res.end("Hello, World!\n");
// Ensure when you navigate to the server on the browser, “Hello world” is returned.

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
