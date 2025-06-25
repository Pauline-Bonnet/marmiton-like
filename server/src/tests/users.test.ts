import request from "supertest";
import database from "../models/db";
import app from "../app";

describe('User API Endpoints', () => {
    describe('GET routes', () => {
        beforeEach(async() => {
            await database.query('DELETE FROM user');
            await database.query(`
                INSERT INTO user (firstname, lastname, pseudo, email, password) 
                VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`,
                ['Alice', 'ÇaGlisse', 'Lili', 'alice@email.com', 'lilidu95', 'Bog', 'Danov', 'Bobby', 'menton@gmail.com', 'groseille']
            );
        });

        describe('GET /api/users', () => {
            it('should return code 200 and array of users', async() => {
                const response = await request(app).get('/api/users');

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);

                if (response.body.length > 0) {
                    expect(response.body[0]).toHaveProperty('user_id');
                    expect(response.body[0]).toHaveProperty('firstname');
                    expect(response.body[0]).toHaveProperty('lastname');
                    expect(response.body[0]).toHaveProperty('email');
                    expect(response.body[0]).not.toHaveProperty('password');
                }
            });
        });

        describe('GET /api/users/:id', () => {
            it('should return 400 if user_id is not a number', async() => {
                const response = await request(app).get('/api/users/abcd');

                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('error', 'L\'id est censé être numérique');
            });

            it('should return 404 if user is not found', async() => {
                const response = await request(app).get('/api/users/99999');
                
                expect(response.status).toBe(404);
                expect(response.body).toHaveProperty('error', 'Utilisateur introuvable');
            });
        });
    });

    describe('POST routes', () => {
        describe('POST /api/users', () => {
            it('should return code 201 with new user when user created', async() => {
                const newUser = {
                    firstname: "Allo", 
                    lastname: "Lola", 
                    pseudo: "C'est encore moi", 
                    email: "superbus@boumboumboum.com",
                    password: "butterfly.FLY",
                    role: "admin"
                };

                const response = await request(app)
                    .post('/api/users')
                    .send(newUser);

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty('user_id');
                expect(response.body).not.toHaveProperty('password');
                expect(response.body).toMatchObject({
                    firstname: "Allo", 
                    lastname: "Lola", 
                    pseudo: "C'est encore moi", 
                    email: "superbus@boumboumboum.com" 
                });
            });
        });
    });
});