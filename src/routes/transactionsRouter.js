import { Router } from "express";
import {setTransaction, getTransactions, deleteTransaction, updateTransaction } from "../controllers/transactionController.js";

import validateLogin from "../middlewares/validateLoginMiddleware.js";

const transactionsRouter = Router();
transactionsRouter.post("/transactions", validateLogin, setTransaction);
transactionsRouter.get("/transactions", validateLogin, getTransactions);
transactionsRouter.delete("/transactions/:id", validateLogin, deleteTransaction);
transactionsRouter.put("/transactions/:id", validateLogin, updateTransaction);

export default transactionsRouter;
