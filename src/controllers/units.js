import { db } from "../db";

export const findById = async (id) => {
  const text = "SELECT * FROM unit WHERE id = $1 RETURNING *";
  const values = [id];

  const result = await db.query(text, values);

  return result.rows[0];
};

class units {
  async get(req, res) {
    try {
      const text = "SELECT * FROM units";
      const result = await db.query(text);

      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: error?.message });
    }
  }
}

export default new units();
