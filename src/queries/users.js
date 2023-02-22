import { db } from "../db";

export const findOne = async (username) => {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  const result = await db.query(text, values);

  return result.rows[0];
};
