import express from "express";
import { db } from "./db";
import routes from "./routes";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("It is a supermarket list API");
});

app.listen(port, () => {
  try {
    db.connect();
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
