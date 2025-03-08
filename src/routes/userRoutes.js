import { Router } from 'express';
import {createUser, getAllUsers, getUserById} from "../controllers/userController.js";

const router = new Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

export default router;