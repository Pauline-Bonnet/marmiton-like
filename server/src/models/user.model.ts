import { ResultSetHeader, RowDataPacket  } from "mysql2";
import database from "./db.js";
import { NewUserInput, User, UserUpdateInput } from "../types/user.js";

export async function findAllUsers(): Promise<User[]> {
    const [rows] = await database.query<User[]>(`SELECT user_id, firstname, lastname, pseudo, email FROM user`);
    return rows;
}

export async function findUserById(id: number): Promise<User | undefined> {
    const [rows] = await database.query<User[]>(`
        SELECT user_id, firstname, lastname, pseudo, email FROM user 
        WHERE user_id = ?
        `, [id]);
    return rows[0];
}

export async function insertUser({
    firstname, 
    lastname, 
    pseudo, 
    email, 
    password, 
    role}: NewUserInput): Promise<User> {
    const fields = ['firstname', 'lastname', 'pseudo', 'password', 'email'];
    const values = [firstname, lastname, pseudo, password, email];

    if (role) {
        fields.push('role');
        values.push(role);
    }

    const connectingElement = values.map(() => '?').join(', ');
    const sqlQuery = `INSERT INTO user (${fields.join(', ')}) VALUES (${connectingElement})`;

    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    const [rows] = await database.query<User[] & RowDataPacket[]>(
        `SELECT user_id, firstname, lastname, pseudo, email, role FROM user WHERE user_id = ?`, [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error('Utilisateur inséré mais ne semble pas être trouvé');
    }
    
    return rows[0];
}

export async function updateUserById(id: number, userData: UserUpdateInput): Promise<User | null> {
    const fields = Object.keys(userData);
    const values = Object.values(userData);

    if (fields.length === 0) {
        return null;
    }

    const connectingElement = fields.map(field => `${field} = ?`).join(', ');

    const [result] = await database.query<ResultSetHeader>(
        `UPDATE user SET ${connectingElement} WHERE user_id = ?`,
        [...values, id]
    );
    if (result.affectedRows === 0) {
        return null;
    }

    const user = await findUserById(id);
    return user ?? null; 
}

export async function deleteUserById(id: number): Promise<number> {
    const [result] = await database.query<ResultSetHeader>('DELETE FROM user WHERE user_id = ?', [id]);

    return result.affectedRows; // nous renvoie combien de lignes ont été supprimées ("affectées" par la requête) --> sera 0 ou 1 ici
}