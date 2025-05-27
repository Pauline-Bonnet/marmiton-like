import express from 'express';
import { getAllUsers } from './../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.post('/', createUSer);
// delete
//put
//patch

export default router;