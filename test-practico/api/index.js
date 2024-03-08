const express = require("express");
const cors = require("cors");
const { getItems, getItem } = require("./controllers");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/items", getItems);

app.get("/api/items/:itemId", getItem);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
