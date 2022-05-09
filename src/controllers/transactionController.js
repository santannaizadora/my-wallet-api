import db from "../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

const setTransaction = async (req, res) => {
    const user = req.user
    const { amount, description, type } = req.body;
    const newTransaction = {
        amount,
        description,
        type,
        createdAt: dayjs().format('DD/MM/YYYY'),
        user: user.userId
    }
    await db.collection('transactions').insertOne(newTransaction);
    return res.status(201).send("Transação criada com sucesso");
}

const getTransactions = async (req, res) => {
    const user = req.user
    console.log(user)
    const userTransactions = await db.collection('transactions').find({ user: user.userId}).toArray();
    const balance = userTransactions.reduce((acc, curr) => {
        if (curr.type === 'deposit') {
            return acc + curr.amount;
        }
        if (curr.type === 'withdraw') {
            return acc - curr.amount;
        }
    }, 0);
    const transactions = userTransactions.map(transaction => {
        transaction.createdAt = transaction.createdAt.toLocaleString('pt-BR');
        delete transaction.user;
        return transaction;
    }
    );
    console.log(balance)
    return res.status(200).send({ balance, transactions });
}

export { setTransaction, getTransactions };

