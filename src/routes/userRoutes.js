import { Router } from 'express';
import {createUser, deleteCurrentUser, getCurrentUser, updateCurrentUser} from "../controllers/userController.js";
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";

const router = new Router();

router.post('/', createUser);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, updateCurrentUser);
router.delete('/me', authMiddleware, deleteCurrentUser);

export default router;
