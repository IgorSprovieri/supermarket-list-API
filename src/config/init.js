import { db } from "../db";
import { unitsSeed } from "../db/seeders";

const createSeeds = async () => {
  for (const element of unitsSeed) {
    const text = "INSERT INTO units (unit, abbreviation) VALUES ($1, $2)";
    const values = [element.unit, element.abbreviation];

    await db.query(text, values);
  }
};

createSeeds();
