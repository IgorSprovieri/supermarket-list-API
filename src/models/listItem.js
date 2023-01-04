const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, min: 0, default: 1 },
  checked: { type: Boolean, default: false },
});

const listItem = mongoose.model("list_item", listItemSchema);

module.exports = listItem;
