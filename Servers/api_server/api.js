const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3001;

const itemsPath = path.join(__dirname, "items.json");

let items = [];

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

const loadItems = () => {
	try {
		const fileItems = fs.readFileSync(itemsPath, "utf8");
		items = JSON.parse(fileItems);
	} catch (error) {
		console.error("Error loading items from disk:", error.message);
		items = [];
	}
};

const saveItems = () => {
	try {
		fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), "utf8"); // Write the 'items' array to the file
		console.log("Items saved to disk.");
	} catch (error) {
		console.error("Error saving items to disk:", error.message);
	}
};

const requestHandler = (req, res) => {
	const response = responseHandler(req, res);

	if (req.url === "/v1/items" && req.method === "POST") {
		items.push({
			...req.body,
			id: Math.floor(Math.random() * 20).toString(),
		});

		saveItems();

		return response({
			data: items,
			code: 201,
		});
	} else if (req.url === "/v1/items" && req.method === "GET") {
		return response({
			data: items,
			code: 200,
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

loadItems();

server.listen(port, () => {
	console.log(`Your Server is live on port: ${port}`);
});
