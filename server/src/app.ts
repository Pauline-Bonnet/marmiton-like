import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import recipeRouter from './routes/recipe.routes';
import { loggerMiddleware } from './middlewares/logger';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors({origin: " http://localhost:5173"}));
app.use(express.json()); // INDISPENSABLE !!!!

app.use(loggerMiddleware);

app.use((req, res, next) => {
    // console.log('BODY APP', req.body);
    next();
})

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({message: 'Le serveur est dans les choux, sorry'});
});

export default app;