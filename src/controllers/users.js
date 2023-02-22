import { db } from "../db";
import { object, string, number, date, InferType } from "yup";

const findOne = async (username) => {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  const result = await db.query(text, values);

  return result.rows[0];
};

class users {
  async post(req, res) {
    try {
      const { username } = req.body;

      const schema = object().shape({
        username: string().required(),
      });

      await schema.validate(req.body);

      const findOneResult = await findOne(username);

      if (!findOneResult) {
        return res.status(400).json({ error: "User already exists" });
      }

      const text = "INSERT INTO users(username) VALUES($1) RETURNING *";
      const values = [username];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(500).json({ error: "The user can not be created" });
      }

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async get(req, res) {
    try {
      const { username } = req.query;

      const schema = object().shape({
        username: string().required(),
      });

      await schema.validate(req.query);

      const text = "SELECT * FROM users WHERE username = $1";
      const values = [username];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(500).json({ error: "User can not be found" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async put(req, res) {
    try {
      const data = {
        id: req.params.id,
        username: req.body.username,
      };

      const schema = object().shape({
        id: number().required(),
        username: string().required(),
      });

      await schema.validate(data);

      const findOneResult = await findOne(data.username);

      if (findOneResult) {
        return res.status(400).json({ error: "User already exists" });
      }

      const text = "UPDATE users SET username = $1 WHERE id = $2 RETURNING *";
      const values = [data.username, data.id];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(500).json({ error: "User can not be updated" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async delete(req, res) {
    try {
      const data = {
        id: req.params.id,
        currentUsername: req.headers.username,
      };

      const schema = object().shape({
        id: number().required(),
        currentUsername: string().required(),
      });

      await schema.validate(data);

      const findOneResult = await findOne(data.currentUsername);

      if (!findOneResult || findOneResult.id != data.id) {
        return res.status(403).json({ error: "Access Denied" });
      }

      const text = "DELETE FROM users WHERE id = $1 RETURNING *";
      const values = [data.id];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(500).json({ error: "User can not be deleted" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new users();
