const http = require("http");
const fs = require("fs");

const PORT = 3001; // port;
const HOSTNAME = "localhost";

const handleRequest = (req, res) => {
	// handles request
	if (req.url === "/index.html") {
		// check url
		const file = fs.readFileSync("./index.html");
		res.setHeader("content-type", "text/html"); // sets content type header
		res.writeHead(200); // sets http status code
		res.write(file); // sets data to be returned
		res.end(); // ends the request cycle
	} else {
		const file = fs.readFileSync("./404.html"); // reads the 404 file
		res.setHeader("content-type", "text/html"); // sets content type header
		res.writeHead(500); // sets http status code
		res.write(file); // sets data to be returned
		res.end(); // ends the request cycle
	}
};

const server = http.createServer(handleRequest); // create server, handle request
http.createServer(handleRequest).listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${PORT}:${HOSTNAME}:/`);
});
