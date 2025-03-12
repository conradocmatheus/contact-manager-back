import { Router } from 'express';
import {
    createContact, deleteAllContactsByUserId,
    deleteContact,
    getAllContacts,
    getAllContactsByUserId,
    getContactById,
    updateContact
} from '../controllers/contactController.js';
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";

const router = new Router();

router.get('/', authMiddleware, getAllContacts);
router.get('/by-user/:id', authMiddleware, getAllContactsByUserId);
router.post('/', authMiddleware, createContact);
router.get('/:id', authMiddleware, getContactById);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);
router.delete('/all/:id', authMiddleware, deleteAllContactsByUserId);

export default router;