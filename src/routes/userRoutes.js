import { Router } from 'express';
import {deleteUser, getUserById, updateUser} from "../controllers/userController.js";
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";

const router = new Router();

router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
