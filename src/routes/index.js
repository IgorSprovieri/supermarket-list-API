import { Router } from "express";
import users from "../controllers/users";
const routes = new Router();

routes.post("/user", users.post);

export default routes;
