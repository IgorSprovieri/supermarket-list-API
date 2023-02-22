import { db } from "../db";

export const findById = async (id) => {
  const text = "SELECT * FROM unit WHERE id = $1 RETURNING *";
  const values = [id];

  const result = await db.query(text, values);

  return result.rows[0];
};
