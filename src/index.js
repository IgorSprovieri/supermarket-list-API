const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3333;

async function connectDataBase() {
  await mongoose.connect("mongodb://localhost:27017");
}

const listItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, min: 0, default: 1 },
  checked: { type: Boolean, default: false },
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

app.post("/item", async (req, res) => {
  const { name, quantity, checked } = req.body;

  try {
    await listItem.validate({
      name: name,
      quantity: quantity,
      checked: checked,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }

  try {
    const newItem = await listItem.create({
      name: name,
      quantity: quantity,
      checked: checked,
    });

    return res.status(201).json(newItem);
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
