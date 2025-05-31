import { 
    findAllUsers, 
    findUserById, 
    insertUser,
    updateUserById,
    deleteUserById
} from "../models/user.model.js";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { NewUserInput, User, UserUpdateInput } from "../types/user.js";

export const getAllUsers: RequestHandler<undefined, User[]> = async (req, res, next) => {
    try {
        const users: User[] = await findAllUsers();
        res.json(users); // <-- V de View c'est ce truc là 
    } catch(err) {
        next(err);
    }
}

export const getUserById: RequestHandler<{ id: string }, User | { error: string }, any, any> = async (req, res, next): Promise<void> => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({error: 'L\'id est censé être numérique'});
            return;
        }

        const user: User | undefined = await findUserById(parsedId);
        if (!user) {
            res.status(404).json({error: 'Utilisateur introuvable'});
            return;
        }
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

export const createUser: RequestHandler<{}, User | { error: string }, NewUserInput> = async (req, res, next) => {
    const { firstname, lastname, pseudo, email, password, role } = req.body; 

    try {
        const newUser = await insertUser({firstname, lastname, pseudo, email, password, role});
        res.status(201).json(newUser);
    } catch(err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            const duplicatedField = err.message.includes('email') ? 'email' : 'pseudo';
            res.status(409).json({ // le statut 409 est utilisé en cas de conflit
                error: `Veuillez entrer un autre ${duplicatedField}`
            });
            return;
        }
        next(err); // sinon on passe l'erreur au middleware d'erreur global
    }
}

export const updateUser: RequestHandler<
  { id: string }, // req.params
  User | { error: string }, // res.body
  UserUpdateInput // req.body
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({error: 'L\'id est censé être numérique'});
            return;
        }

        const updatedUser: User | null = await updateUserById(parsedId, req.body);
        if (!updatedUser) {
            res.status(404).json({error: 'Utilisateur introuvable'});
            return;
        }
        res.status(200).json(updatedUser);
    } catch(err: any) {
        next(err);
    } 
}

export const deleteUser: RequestHandler<
  { id: string },
  { message: string } | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({error: 'L\'id est censé être numérique'});
            return;
        }
        const deletedRows = await deleteUserById(parsedId);
        if (deletedRows === 0) {
            res.status(404).json({error: 'Utilisateur introuvable'});
            return;
        }
        res.sendStatus(204); // 204 = succès, mais pas de contenu renvoyé
    } catch(err) {
        next(err);
    }
}