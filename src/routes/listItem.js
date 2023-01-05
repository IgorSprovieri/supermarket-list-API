const express = require("express");
const router = express.Router();
const validations = require("../validate/validations");
const listItem = require("../models/listItem");

router.get("/items", async (req, res) => {
  try {
    const { username } = req.headers;

    if (!username) {
      return res.status(401).json({ error: "username is required" });
    }

    const items = await listItem.find({ username: username });

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/item", async (req, res) => {
  const { username } = req.headers;
  const { name, quantity, checked } = req.body;

  if (!username) {
    return res.status(401).json({ error: "username is required" });
  }

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
      username: username,
    });

    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/item/:id", async (req, res) => {
  const id = req.params.id;
  const { username } = req.headers;

  if (!username) {
    return res.status(401).json({ error: "username is required" });
  }

  if (!id || !validations.validateIdObject(id)) {
    return res.status(400).json({ error: "Id is missing or invalid" });
  }

  try {
    const itemFound = await listItem.findById(id);

    if (!itemFound) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (itemFound.username != username) {
      return res.status(401).json({ error: "Acess denied: username is wrong" });
    }

    const deletedItem = await listItem.findByIdAndDelete(id);

    return res.status(200).json(deletedItem);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.put("/item/:id", async (req, res) => {
  const id = req.params.id;
  const { username } = req.headers;
  const { name, quantity, checked } = req.body;

  if (!id || !validations.validateIdObject(id)) {
    return res.status(400).json({ error: "Id is missing or invalid" });
  }

  if (quantity && !validations.validateNumber(quantity)) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  if (!username) {
    return res.status(401).json({ error: "username is required" });
  }

  try {
    const itemFound = await listItem.findById(id);

    if (!itemFound) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (itemFound.username != username) {
      return res.status(401).json({ error: "Acess denied: username is wrong" });
    }

    const updateItem = await listItem.findByIdAndUpdate(
      id,
      {
        name: name,
        quantity: quantity,
        checked: checked,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updateItem);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
