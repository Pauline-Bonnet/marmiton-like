import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import recipeRouter from './routes/recipe.routes.js';
import { loggerMiddleware } from './middlewares/logger.js';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(cors({origin: " http://localhost:5173"}));
app.use(express.json()); // INDISPENSABLE !!!!

app.use(loggerMiddleware);

app.use((req, res, next) => {
    // console.log('BODY APP', req.body);
    next();
})

app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({message: 'Le serveur est dans les choux, sorry'});
});

app.listen(PORT, () => {
    console.info(`Ce serveur tourne sur le port ${PORT}`);
});
