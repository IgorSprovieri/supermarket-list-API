import { object, string, number, date, InferType } from "yup";
import userQueries from "../queries/users";

export default async (req, res, next) => {
  try {
    const data = {
      currentUser: req.headers.username,
    };

    const schema = object().shape({
      currentUser: string().required(),
    });

    await schema.validate(data);

    const result = await userQueries.findOne(data.currentUser);

    if (!result) {
      return res.status(403).json({ error: "Access Denied" });
    }

    req.userId = result.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: error?.message });
  }
};
