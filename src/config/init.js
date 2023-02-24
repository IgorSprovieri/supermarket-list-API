import { db } from "../db";
import { unitsSeeder } from "../db/seeders";
import { tables } from "../db/migrations";

try {
  await db.connect();
  createTables();
  createSeeders();
} catch (error) {
  console.log(error);
}

const createTables = async () => {
  for (const element of tables) {
    await db.query(element.query);
  }
};

const createSeeders = async () => {
  for (const element of unitsSeeder) {
    const text = "INSERT INTO units (unit, abbreviation) VALUES ($1, $2)";
    const values = [element.unit, element.abbreviation];

    await db.query(text, values);
  }
};
