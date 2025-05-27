import database from "./db.js";

export async function findAllUsers() {
    const [rows] = await database.query(`SELECT firstname, pseudo, email FROM user`);
    return rows;
}