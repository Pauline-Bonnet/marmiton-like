import app from "./app";

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
    console.info(`Ce serveur tourne sur le port ${PORT}`);
});