import { db } from "..";

class userQueries {
  async findOne(username) {
    try {
      const text = "SELECT * FROM users WHERE username = $1";
      const values = [username];

      const result = await db.query(text, values);

      return result.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new userQueries();
