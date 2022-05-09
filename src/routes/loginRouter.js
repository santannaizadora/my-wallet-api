import { Router } from "express";
import loginUser from "../controllers/loginController.js";
import validateLogin from "../middlewares/loginMiddleware.js";

const registerRouter = Router();
registerRouter.post("/login", validateLogin,loginUser);

export default registerRouter;