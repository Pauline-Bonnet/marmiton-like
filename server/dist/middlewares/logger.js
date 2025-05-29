export const loggerMiddleware = (req, res, next) => {
    console.log(`Vous avez requété ${req.url}, avec la méthode : ${req.method}`);
    next();
};
