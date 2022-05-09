import { Router } from "express";
import registerUser from "./../controllers/registerController.js";
import validateRegister from './../middlewares/registerMiddleware.js';

const registerRouter = Router();
registerRouter.post("/register",validateRegister, registerUser);

export default registerRouter;