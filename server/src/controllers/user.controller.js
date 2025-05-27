import { findAllUsers } from "../models/user.model.js";

export async function getAllUsers(req, res, next) {
    try {
        const users = await findAllUsers();
        res.json(users); // <-- V de View c'est ce truc là 
    } catch(err) {
        next(err);
    }
}