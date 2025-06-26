import express from 'express';
import { 
    createRecipe,
    deleteRecipe,
    editRecipe,
    getAllRecipes,
    getLastRecipes,
 } from '../controllers/recipe.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/latest', getLastRecipes);
// @ts-ignore
router.post('/', authMiddleware, createRecipe);
// @ts-ignore
router.patch('/:id', authMiddleware, editRecipe);
// @ts-ignore
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;
