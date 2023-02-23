import { db } from "../db";

class unitQueries {
  async findById(id) {
    try {
      const text = "SELECT * FROM units WHERE id = $1";
      const values = [id];

      const result = await db.query(text, values);

      return result.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new unitQueries();
