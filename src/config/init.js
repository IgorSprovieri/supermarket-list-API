import { db } from "../db";
import { unitsSeed } from "../seeds";

const createSeeds = async () => {
  for (const element of unitsSeed) {
    const text = "INSERT INTO units (name, abbreviation) VALUES ($1, $2)";
    const values = [element.name, element.abbreviation];

    await db.query(text, values);
  }
};

createSeeds();
