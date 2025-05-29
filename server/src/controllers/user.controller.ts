import { 
    findAllUsers, 
    findUserById, 
    insertUser,
    updateUserById,
    deleteUserById
} from "../models/user.model.js";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { NewUserInput, User } from "../types/user.js";

export const getAllUsers: RequestHandler<undefined, User[]> = async (req, res, next) => {
    try {
        const users: User[] = await findAllUsers();
        res.json(users); // <-- V de View c'est ce truc là 
    } catch(err) {
        next(err);
    }
}

export const getUserById = async (req: Request<{ id: string }>, res: Response<User | { error: string }>, next: NextFunction) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({error: 'L\'id est censé être numérique'});
        }

        const user: User | undefined = await findUserById(parsedId);
        if (!user) {
            return res.status(404).json({error: 'Utilisateur introuvable'});
        }
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

export const createUser = async (
    req: Request<{}, {}, User>,
    res: Response<User | { error: string }>,
    next: NextFunction
) => {
    const { firstname, lastname, pseudo, email, password, role } = req.body; 

    try {
        const newUser = await insertUser({firstname, lastname, pseudo, email, password, role});
        res.status(201).json(newUser);
    } catch(err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            const duplicatedField = err.message.includes('email') ? 'email' : 'pseudo';
            return res.status(409).json({
                error: `Veuillez entrer un autre ${duplicatedField}`
            });
        }
        next(err);
    }
}

export const updateUser = async (
    req: Request<{ id: string }, {}, Partial<User>>,
    res: Response<User | { error: string }>,
    next: NextFunction
) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({error: 'L\'id est censé être numérique'});
        }
        const updatedUser: User | null = await updateUserById(parsedId, req.body);

        if (!updatedUser) {
            return res.status(404).json({error: 'Utilisateur introuvable'});
        }
        res.status(200).json(updatedUser);
    } catch(err: any) {
        next(err);
    } 
}

export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response<void | { error: string }>,
    next: NextFunction
) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({error: 'L\'id est censé être numérique'});
        }
        const deletedRows = await deleteUserById(parsedId);
        if (deletedRows === 0) {
            return res.status(404).json({error: 'Utilisateur introuvable'});
        }
        res.sendStatus(204); // 204 = succès, mais pas de contenu renvoyé
    } catch(err) {
        next(err);
    }
}