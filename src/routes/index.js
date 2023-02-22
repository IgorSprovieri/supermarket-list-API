import { Router } from "express";
import users from "../controllers/users";
import units from "../controllers/units";
import items from "../controllers/items";
import auth from "../middlewares/auth";
const routes = new Router();

routes.post("/user", users.post);
routes.get("/user", users.get);
routes.get("/units", units.get);

//----------- Logged Routes ------------
routes.use(auth);
routes.put("/user/:id", users.put);
routes.delete("/user/:id", users.delete);

routes.post("/item", items.post);
export default routes;
