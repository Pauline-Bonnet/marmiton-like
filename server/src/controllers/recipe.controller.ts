import { NextFunction, Request, RequestHandler, Response } from "express";
import { 
    deleteRecipeById,
    findLastTenRecipes,
    findRecipeById,
    findRecipes,
    insertRecipe,
    updateRecipe
 } from "../models/recipe.model";
import { RecipeUpdate } from "../types/recipe";


export const getAllRecipes: RequestHandler = async (req, res, next) => {
    try {
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
        const recipes = await findLastTenRecipes();
        res.json(recipes);
    } catch (err) {
        next(err);
    }
};

export const getRecipeById: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const recipe = await findRecipeById(id);
    if (!recipe) {
      res.status(404).json({ error: "Recette non trouvée" });
      return;
    }

    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

export const createRecipe: RequestHandler = async (req, res, next) => {
  try {
    const newRecipe = await insertRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

export const editRecipe: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const updatedRecipe: RecipeUpdate | null = await updateRecipe(parsedId, req.body);

    if (!updatedRecipe) {
        res.status(404).json({ error: "Recette non trouvée ou aucune modification effectuée" });
        return;
    }
    res.json({ message: "Recette modifiée avec succès", recipe: updatedRecipe });
  } catch (err) {
    next(err);
  }
}

export const deleteRecipe: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = parseInt(req.params.id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    } 

    const success = await deleteRecipeById(parsedId);
    if (!success) {
       res.status(404).json({ error: "Recette non trouvée" });
       return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}
