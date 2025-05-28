import database from "./db.js";

export async function findAllUsers() {
    const [rows] = await database.query(`SELECT user_id, firstname, lastname, pseudo, email FROM user`);
    return rows;
}

export async function findUserById(id) {
    const [rows] = await database.query(`
        SELECT user_id, firstname, lastname, pseudo, email FROM user 
        WHERE user_id = ?
        `, [id]);
    return rows[0];
}

export async function insertUser({firstname, lastname, pseudo, email, password, role}) {
    const fields = ['firstname', 'lastname', 'pseudo', 'password', 'email'];
    const values = [firstname, lastname, pseudo, password, email];

    if (role) {
        fields.push('role');
        values.push(role);
    }

    const connectingElement = values.map(() => '?').join(', ');
    const sqlQuery = `INSERT INTO user (${fields.join(', ')}) VALUES (${connectingElement})`;

    const [result] = await database.query(sqlQuery, values);
    return {
        user_id: result.insertId, firstname, lastname, pseudo, email, role: role || 'user'
    };
}

export async function updateUserById(id, userData) {
    const fields = Object.keys(userData);
    const values = Object.values(userData);

    if (fields.length === 0) {
        return null;
    }

    const connectingElement = fields.map(field => `${field} = ?`).join(', ');
    console.log('PATCH connectingElement', connectingElement);
    const [result] = await database.query(
        `UPDATE user SET ${connectingElement} WHERE user_id = ?`,
        [...values, id]
    );
    if (result.affectedRows === 0) {
        return null;
    }

    return findUserById(id); // ligne qui était commentée, donc forcément updateUserById retournait undefined ...
}

export async function deleteUserById(id) {
    await database.query('DELETE FROM user WHERE user_id = ?', [id]);
}