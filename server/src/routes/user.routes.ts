import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { userCreationValidationRules, userUpdateValidationRules, validate } from '../middlewares/user-validation.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', userCreationValidationRules, validate, createUser);
router.patch('/:id', userUpdateValidationRules, validate, updateUser);
router.delete('/:id', deleteUser);

export default router;