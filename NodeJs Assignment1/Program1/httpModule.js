const http = require("http");

const PORT = 3000;
const HOSTNAME = "localhost";

function requestHandler(req, res) {
	console.log(req);
	res.end("Hello world");
}

// Create the server
const server = http.createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
