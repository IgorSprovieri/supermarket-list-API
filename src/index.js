const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3333;

async function connectDataBase() {
  await mongoose.connect("mongodb://localhost:27017");
}

const listItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean,
});

const listItem = mongoose.model("list_item", listItemSchema);

app.get("/items", async (req, res) => {
  try {
    const items = await listItem.find();

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  mongoose.set("strictQuery", true);
  connectDataBase().catch((error) => {
    console.log(error);
  });
  console.log(`Example app listening on port ${port}`);
});
