import { Router } from 'express';
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/userController.js";
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";

const router = new Router();

router.get('/', authMiddleware, getAllUsers);
router.post('/', createUser);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/:id', authMiddleware, updateUser);

export default router;