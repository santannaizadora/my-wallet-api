import { Router } from "express";
import {setTransaction, getTransactions } from "../controllers/transactionController.js";

import validateLogin from "../middlewares/validateLoginMiddleware.js";

const transactionsRouter = Router();
transactionsRouter.post("/transactions", validateLogin, setTransaction);
transactionsRouter.get("/transactions", validateLogin, getTransactions);

export default transactionsRouter;
