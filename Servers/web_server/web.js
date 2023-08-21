const http = require("http");
const fs = require("fs");

const PORT = 3001; // port;
const HOSTNAME = "localhost";

const handleRequest = (req, res) => {
	// handles request
	if (req.url === "/index.html") {
		// check url
		const file = fs.readFileSync("./index.html");
		res.setHeader("content-type", "text/html");
		res.writeHead(200);
		res.write(file);
		res.end();
	} else {
		const file = fs.readFileSync("./404.html");
		res.setHeader("content-type", "text/html");
		res.writeHead(500);
		res.write(file);
		res.end();
	}
};

const server = http.createServer(handleRequest);
http.createServer(handleRequest).listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${PORT}:${HOSTNAME}:/`);
});
