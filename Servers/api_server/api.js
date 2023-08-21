const http = require("http");

const port = 3001;

const items = [];

const responseHandler =
	(req, res) =>
	({ code = 200, error = null, data = null }) => {
		res.setHeader("content-type", "application/json");
		res.writeHead(code);
		res.write(JSON.stringify({ data, error }));
		res.end();
	};

const bodyParser = (req, res, callback) => {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		if (body.length) {
			const parsedBody = Buffer.concat(body).toString();
			req.body = JSON.parse(parsedBody);
		}

		callback(req, res);
	});
};

const requestHandler = (req, res) => {
	const response = responseHandler(req, res);

	if (req.url === "/v1/items" && req.method === "POST") {
		items.push({
			...req.body,
			id: Math.floor(Math.random() * 20).toString(),
		});

		return response({
			data: items,
			code: 201,
		});
	}
	//Get all items

	if (req.url === "/v1/items" && req.method === "GET") {
		return response({
			data: items,
			code: 200,
		});
	}

	//Get one item

	if (req.url.startsWith("/v1/items/") && req.method === "GET") {
		const id = req.url.split("/")[3];
		console.log({ id });

		const itemIndex = items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			return response({
				code: 404,
				error: "item not found",
			});
		}

		const item = items[itemIndex];

		return response({
			data: item,
			code: 200,
		});
	}
	//UPATE ITEM
	if (req.url.startsWith("/v1/items/") && req.method === "PATCH") {
		const id = req.url.split("/")[3];

		console.log({ id, body: req.body });

		const itemIndex = items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			return response({
				code: 404,
				error: "item not found",
			});
		}

		const item = { ...items[itemIndex], ...req.body };

		return response({
			data: item,
			code: 200,
		});
	}

	//DELETE ITEM
	if (req.url.startsWith("/v1/items/") && req.method === "DELETE") {
		const id = req.url.split("/")[3];

		console.log({ id, body: req.body });

		const itemIndex = items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			return response({
				code: 404,
				error: "item not found",
			});
		}

		items.splice(itemIndex, 1);

		return response({
			data: items,
			code: 200,
		});
	}
};

//Create Items
const server = http.createServer((req, res) =>
	bodyParser(req, res, requestHandler)
);

server.listen(port, () => {
	console.log(`Your Server is live on port: ${port}`);
});
