import { Router } from 'express';
import {createUser, deleteCurrentUser, getCurrentUser, updateCurrentUser} from "../controllers/userController.js";
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";
import { validateUpdateUser, validateSignup } from '../utils/middlewares/validationMiddleware.js';

const router = new Router();

router.post('/', validateSignup, createUser); // createUser takes the same fields as signup
router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, validateUpdateUser, updateCurrentUser);
router.delete('/me', authMiddleware, deleteCurrentUser);

export default router;
