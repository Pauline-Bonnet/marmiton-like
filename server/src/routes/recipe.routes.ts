import express from 'express';
import { 
    getAllRecipes,
    getLastRecipes,
    // getLastRecipes
 } from '../controllers/recipe.controller';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/latest', getLastRecipes)

export default router;
