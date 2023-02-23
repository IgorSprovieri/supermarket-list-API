import { db } from "..";

class itemQueries {
  async findById(id) {
    try {
      const text = "SELECT * FROM items WHERE id = $1";
      const values = [id];

      const result = await db.query(text, values);

      return result.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new itemQueries();
