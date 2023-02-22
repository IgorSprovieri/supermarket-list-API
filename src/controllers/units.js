import { db } from "../db";

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
