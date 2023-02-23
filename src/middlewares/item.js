import { object, string, number, date, InferType } from "yup";
import itemQueries from "../db/queries/items";

export default async (req, res, next) => {
  try {
    const data = {
      user_id: req.userId,
      id: req.params.id,
    };

    const schema = object().shape({
      id: number().required(),
    });

    await schema.validate(data);

    const result = await itemQueries.findById(data.id);

    if (!result) {
      return res.status(404).json({ error: "item not found" });
    }

    if (result.user_id != data.user_id) {
      return res.status(403).json({ error: "Access Denied" });
    }

    req.itemId = data.id;
    next();
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
};
