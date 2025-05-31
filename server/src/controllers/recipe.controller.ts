import { NextFunction, Request, RequestHandler, Response } from "express";
import { 
    getLastTenRecipes,
    findRecipes
 } from "../models/recipe.model";


export const getAllRecipes: RequestHandler = async (req, res, next) => {
    try {
        console.log('CONTROLLER')
        const { category, maxTime, search, page = 1, limit = 10 } = req.query;
        const maxTimeNum = maxTime ? Number.parseInt(maxTime as string) : null;
        const pageNum = Number.parseInt(page as string);
        const limitNum = Number.parseInt(limit as string);

        if (
            (maxTime !== undefined && maxTime !== null && isNaN(maxTimeNum as number)) ||
            isNaN(pageNum) ||
            isNaN(limitNum)
        ) {
            res.status(400).json({error: 'Paramètres invalides'});
            return;
        }

        const recipes = await findRecipes({
            category: category as string | undefined,
            maxTime: maxTimeNum,
            search: search as string | undefined,
            page: pageNum,
            limit: limitNum
        });

        console.log('RECIPES controller', recipes)
        res.json(recipes);
    } catch(err) {
        next(err);
    }
}

export const getLastRecipes: RequestHandler = async (req, res, next) =>  {
    try {
        const recipes = await getLastTenRecipes();
        res.json(recipes);
    } catch (err) {
        next(err);
    }
};