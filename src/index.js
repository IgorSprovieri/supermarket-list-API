require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const listItemRouter = require("./routes/listItem");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = Number(process.env.PORT);

async function connectDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
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
