const express = require("express");
const mongoose = require("mongoose");
const listItemRouter = require("./routes/listItem.js");
const app = express();
app.use(express.json());
const port = 3333;

async function connectDataBase() {
  await mongoose.connect("mongodb://localhost:27017");
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  mongoose.set("strictQuery", true);
  connectDataBase().catch((error) => {
    console.log(error);
  });
  app.use("/", listItemRouter);
  console.log(`Example app listening on port ${port}`);
});
