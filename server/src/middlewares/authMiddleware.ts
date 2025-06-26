import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "Token manquant"});
    }

    const token = authHeader.split(' ')[1];
    console.log('TOKEN', token);

    try {
        const decoded = jwt.verify(token, secretKey as string) as JwtPayload;
        if (!decoded || typeof decoded === "string") {
            return res.status(401).json({error: "Token invalide"});
        }

        (req as any).user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    } catch (error) {
        next(error);
    }
}