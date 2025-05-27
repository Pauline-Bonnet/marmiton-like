import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import { loggerMiddleware } from './middlewares/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// const mockUsers = [
//     {
//         user_id: 1,
//         firstname: "firstname1",
//         lastname: "lastname1",
//         pseudo: "1",
//         email:"firstname1@gmail.com",
//         password: "password1"
//     },
//         {
//         user_id: 2,
//         firstname: "firstname2",
//         lastname: "lastname2",
//         pseudo: "2",
//         email:"firstname2@gmail.com",
//         password: "password2"
//     },
//     {
//         user_id: 3,
//         firstname: "firstname3",
//         lastname: "lastname3",
//         pseudo: "3",
//         email:"firstname3@gmail.com",
//         password: "password3"
//     }
// ];

app.use(loggerMiddleware);

app.use('/api/users', userRouter);

// app.get('/api/users/:id', (req, res, next) => {
//     const userId = Number.parseInt(req.params.id);
//     const user = mockUsers.find(user => user.id === userId);
//     if (!user) {
//         const error = new Error(`le user avec l'id ${userId} n'existe pas`);
//         error.status = 404;
//         return next(error);
//     }
//     res.status(200).json(user);
// });

app.listen(PORT, () => {
    console.info(`Ce serveur tourne sur le port ${PORT}`);
});
