import { findAllUsers, findUserById, insertUser, updateUserById, deleteUserById } from "../models/user.model.js";
export async function getAllUsers(req, res, next) {
    try {
        const users = await findAllUsers();
        res.json(users); // <-- V de View c'est ce truc là 
    }
    catch (err) {
        next(err);
    }
}
export async function getUserById(req, res, next) {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'L\'id est censé être numérique' });
        }
        const user = await findUserById(parsedId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}
export async function createUser(req, res, next) {
    const { firstname, lastname, pseudo, email, password, role } = req.body;
    try {
        const newUser = await insertUser({ firstname, lastname, pseudo, email, password, role });
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            const duplicatedField = err.message.includes('email') ? 'email' : 'pseudo';
            return res.status(409).json({
                error: `Veuillez entrer un autre ${duplicatedField}`
            });
        }
        next(err);
    }
}
export async function updateUser(req, res, next) {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'L\'id est censé être numérique' });
        }
        const updatedUser = await updateUserById(parsedId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
}
export async function deleteUser(req, res, next) {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'L\'id est censé être numérique' });
        }
        await deleteUserById(parsedId);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}
