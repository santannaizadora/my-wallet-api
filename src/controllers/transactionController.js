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
        user: user._id
    }
    await db.collection('transactions').insertOne(newTransaction);
    return res.status(201).send("Transação criada com sucesso");
}

const getTransactions = async (req, res) => {
    const user = req.user
    const userTransactions = await db.collection('transactions').find({ user: user._id }).toArray();
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
    return res.status(200).send({ balance, transactions });
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = await db.collection('transactions').findOne({ _id: ObjectId(id) });
    if (!transaction) {
        return res.status(404).send("Transação não encontrada");
    }
    try {
        await db.collection('transactions').deleteOne({ _id: ObjectId(id) });
        return res.status(200).send("Transação deletada com sucesso");
    } catch (err) {
        return res.status(500).send("Erro ao deletar transação");
    }
}

const updateTransaction = async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const { amount, description } = req.body;
    const transaction = await db.collection('transactions').findOne({ _id: ObjectId(id) });
    if (!transaction) {
        return res.status(404).send("Transação não encontrada");
    }
    if (transaction.user.toString() !== user._id.toString()) {
        return res.status(401).send("Não autorizado");
    }
    const newTransaction = {
        amount,
        description
    }
    await db.collection('transactions').updateOne({ _id: ObjectId(id) }, { $set: newTransaction });
    return res.status(200).send("Transação atualizada com sucesso");
}

export { setTransaction, getTransactions, deleteTransaction, updateTransaction };

