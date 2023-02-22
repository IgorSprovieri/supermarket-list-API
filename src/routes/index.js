import { Router } from "express";
import users from "../controllers/users";
const routes = new Router();

routes.post("/user", users.post);
routes.get("/user", users.get);
routes.put("/user/:id", users.put);
routes.delete("/user/:id", users.delete);

export default routes;
