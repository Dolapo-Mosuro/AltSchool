const express = require("express");
const itemsController = require("../controllers/itemsController");
const path = require("path");
const fs = require("fs").promises;

const router = express.Router();

const itemsPath = path.join(__dirname, "./items.json");

const loadItems = async () => {
	try {
		const fileItems = await fs.readFile(itemsPath, "utf8");
		items = JSON.parse(fileItems);
	} catch (error) {
		console.error("Error loading items from disk:", error.message);
		items = [];
	}
};

router.get("/", async (req, res) => {
	await loadItems();
	const items = itemsController.getItems();
	res.json({ data: items });
});

router.get("/:id", async (req, res) => {
	await loadItems();
	const id = req.params.id;
	const item = itemsController.getItemById(id);
	if (item) {
		res.json({ data: item });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

router.post("/", async (req, res) => {
	await loadItems();
	const newItem = {
		...req.body,
		id: Math.floor(Math.random() * 20).toString(),
	};
	itemsController.addItem(newItem);
	res.status(201).json({ data: newItem });
});

router.patch("/:id", async (req, res) => {
	await loadItems();
	const id = req.params.id;
	const newData = req.body;
	itemsController.updateItem(id, newData);
	res.json({ message: "Item updated successfully" });
});

router.delete("/:id", async (req, res) => {
	await loadItems();
	const id = req.params.id;
	itemsController.deleteItem(id);
	res.json({ message: "Item deleted successfully" });
});

module.exports = router;
