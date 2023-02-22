import { object, string, number, date, InferType } from "yup";
import { findOne } from "../controllers/users";

export default async (req, res, next) => {
  try {
    const data = {
      currentUser: req.headers.username,
    };

    const schema = object().shape({
      currentUser: string().required(),
    });

    await schema.validate(data);

    const result = await findOne(data.currentUser);

    if (!result) {
      throw new Error("Access Denied");
    }

    req.userId = result.id;
    next();
  } catch (error) {
    return res.status(403).json({ error: error?.message });
  }
};
