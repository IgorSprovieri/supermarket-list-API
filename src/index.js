require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const listItemRouter = require("./routes/listItem");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const port = Number(process.env.PORT) || 3000;

async function connectDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
}

app.get("/", (req, res) => {
  res.send("Supermarket List Api is running!");
});

app.listen(port, "0.0.0.0", () => {
  mongoose.set("strictQuery", true);
  connectDatabase().catch((error) => {
    console.log(error);
  });
  app.use("/", listItemRouter);
  console.log(`Supermarket List listening on port ${port}`);
});
