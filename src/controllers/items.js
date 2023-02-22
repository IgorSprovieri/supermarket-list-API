import { object, string, number, date, InferType, boolean } from "yup";
import { db } from "../db";
import unitQueries from "../queries/units";

class items {
  async post(req, res) {
    try {
      const data = {
        user_id: req.userId,
        unit_id: req.body.unit_id,
        name: req.body.name,
        quantity: req.body.quantity,
        checked: req.body.checked,
      };

      const schema = object().shape({
        unit_id: number().required(),
        name: string().required(),
        quantity: number().required(),
        checked: boolean().required(),
      });

      await schema.validate(data);

      const unitFound = unitQueries.findById(data.unit_id);

      if (!unitFound) {
        res.status(404).json({ error: "Unit not found" });
      }

      const text =
        "INSERT INTO items (user_id, unit_id, name, quantity, checked) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const values = [
        data.user_id,
        data.unit_id,
        data.name,
        data.quantity,
        data.checked,
      ];

      const result = await db.query(text, values);

      if (!result.rows[0]) {
        return res.status(400).json({ error: "Item can not be created" });
      }

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new items();
