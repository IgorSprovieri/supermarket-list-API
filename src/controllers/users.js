import { db } from "../db";
import { object, string, number, date, InferType } from "yup";

const alreadyExists = async (username) => {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  const result = await db.query(text, values);

  return result;
};

class users {
  async post(req, res) {
    try {
      const { username } = req.body;

      const schema = object().shape({
        username: string().required(),
      });

      await schema.validate(req.body);

      const alreadyExistsResult = await alreadyExists(username);

      if (alreadyExistsResult.rowCount > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const text = "INSERT INTO users(username) VALUES($1) RETURNING *";
      const values = [username];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(500).json({ error: "The user can not created" });
      }

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new users();
