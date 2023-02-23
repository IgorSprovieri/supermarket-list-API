import { Router } from "express";
import userController from "../controllers/user";
import unitController from "../controllers/unit";
import itemController from "../controllers/item";
import authMiddleware from "../middlewares/auth";
import itemMiddleware from "../middlewares/item";
const routes = new Router();

routes.get("/user", userController.get);
routes.post("/user", userController.post);
routes.get("/units", unitController.get);

//----------- Logged Routes ------------
routes.use(authMiddleware);
routes.put("/user/:id", userController.put);
routes.delete("/user/:id", userController.delete);

routes.get("/items", itemController.get);
routes.post("/item", itemController.post);

routes.use("/item/:id", itemMiddleware);
routes.put("/item/:id", itemController.put);
routes.delete("/item/:id", itemController.delete);

export default routes;
