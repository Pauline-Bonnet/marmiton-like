import { NextFunction, Request, Response } from "express";
import { findUserByEmail, insertUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(401).json({error: "Adresse email incorrecte"});
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({error: "Mot de passe incorrect"});
            return;
        }

        const token = jwt.sign(
            {user_id: user.user_id, role: user.role},
            (process.env.JWT_SECRET as string),
            { expiresIn: '2h' }
        );

        const { password: _, ...safeUser} = user;
        res.json({token, user: safeUser});
    } catch (error) {
        next(error);
    }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> =>  {
    try {
        const {firstname, lastname, email, password, pseudo} = req.body;

        if(!firstname || !lastname || !pseudo || !email || !password) {
            res.status(400).json({error: "champ manquant"});
            return;
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await insertUser({firstname, lastname, email, hashedPassword, pseudo, role: 'user'});
        res.status(201).json({message: "Utilsateur créé"});
    } catch (error) {
        next(error);
    }
}