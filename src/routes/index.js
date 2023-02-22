import { Router } from "express";
import users from "../controllers/users";
import units from "../controllers/units";
import auth from "../middlewares/auth";
const routes = new Router();

routes.post("/user", users.post);
routes.get("/user", users.get);
routes.get("/units", units.get);

//----------- Logged Routes ------------
routes.use(auth);
routes.put("/user/:id", users.put);
routes.delete("/user/:id", users.delete);

export default routes;
