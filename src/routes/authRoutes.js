import express from 'express';
import {signup, login, updatePassword} from '../controllers/authController.js';
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";
import { validateSignup, validateLogin, validateUpdatePassword } from '../utils/middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

router.put('/password', authMiddleware, validateUpdatePassword, updatePassword);

export default router;
