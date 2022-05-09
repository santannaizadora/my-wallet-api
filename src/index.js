import express from 'express';
import cors from 'cors';
import registerRouter from './routes/registerRouter.js';
import loginRouter from './routes/loginRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(registerRouter)
app.use(loginRouter)
app.use(transactionsRouter)

app.listen(5000);