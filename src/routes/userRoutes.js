import { Router } from 'express';
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/userController.js";

const router = new Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;