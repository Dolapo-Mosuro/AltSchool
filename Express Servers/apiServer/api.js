const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const itemsController = require("./api/controllers/itemsController");
const itemsRoutes = require("./api/routes/itemsRoutes");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "api/views")));

itemsController.loadItems();

app.use("/v1/items", itemsRoutes);

app.listen(port, () => {
	console.log(`Your Server is live on port: ${port}`);
});
