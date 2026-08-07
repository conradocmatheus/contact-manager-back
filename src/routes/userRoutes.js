import { Router } from 'express';
import {deleteCurrentUser, getCurrentUser, updateCurrentUser} from "../controllers/userController.js";
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";
import { validateUpdateUser } from '../utils/middlewares/validationMiddleware.js';

const router = new Router();

router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, validateUpdateUser, updateCurrentUser);
router.delete('/me', authMiddleware, deleteCurrentUser);

export default router;
