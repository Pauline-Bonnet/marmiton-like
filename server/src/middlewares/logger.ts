export const loggerMiddleware = (req: any, res: any, next: any) => {
    console.log(`Vous avez requété ${req.url}, avec la méthode : ${req.method}`);
    next();
};