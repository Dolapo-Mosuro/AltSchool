const path = require("path");
const fs = require("fs").promises;

const itemsPath = path.join(__dirname, "items.json");

const loadItems = async () => {
	try {
		const fileItems = await fs.readFile(itemsPath, "utf8");
		items = JSON.parse(fileItems);
	} catch (error) {
		console.error("Error loading items from disk:", error.message);
		items = [];
	}
};

const getItems = async () => {
	await loadItems();
	return items;
};

const getItemById = async (id) => {
	await loadItems();
	return items.find((item) => item.id === id);
};

const addItem = async (newItem) => {
	await loadItems();
	items.push(newItem);
	await fs.writeFile(itemsPath, JSON.stringify(items));
};

const updateItem = async (id, newData) => {
	await loadItems();
	const itemIndex = items.findIndex((item) => item.id === id);
	if (itemIndex !== -1) {
		items[itemIndex] = { ...items[itemIndex], ...newData };
		await fs.writeFile(itemsPath, JSON.stringify(items));
	}
};

const deleteItem = async (id) => {
	await loadItems();
	const itemIndex = items.findIndex((item) => item.id === id);
	if (itemIndex !== -1) {
		items.splice(itemIndex, 1);
		await fs.writeFile(itemsPath, JSON.stringify(items));
	}
};

module.exports = {
	getItems,
	getItemById,
	addItem,
	updateItem,
	deleteItem,
};
