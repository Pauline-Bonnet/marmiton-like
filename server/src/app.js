import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import { loggerMiddleware } from './middlewares/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(express.json()); // INDISPENSABLE !!!!

app.use(loggerMiddleware);
app.use((req, res, next) => {
    console.log('BODY APP', req.body);
    next();
})

app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: 'Le serveur est dans les choux, sorry'});
});

app.listen(PORT, () => {
    console.info(`Ce serveur tourne sur le port ${PORT}`);
});
