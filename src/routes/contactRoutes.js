import { Router } from 'express';
import {
    createContact, deleteAllContactsByUser,
    deleteContact,
    getAllContacts,
    getAllContactsByUserId,
    getContactById,
    updateContact
} from '../controllers/contactController.js';
import {authMiddleware} from "../utils/middlewares/authMiddleware.js";
import { validateContact, validateIdParam, validatePagination } from '../utils/middlewares/validationMiddleware.js';

const router = new Router();

router.get('/', authMiddleware, getAllContacts);
router.get('/by-user/:id', authMiddleware, validatePagination, getAllContactsByUserId);
router.post('/', authMiddleware, validateContact, createContact);
router.get('/:id', authMiddleware, validateIdParam, getContactById);
router.put('/:id', authMiddleware, validateIdParam, validateContact, updateContact);
router.delete('/all', authMiddleware, deleteAllContactsByUser);
router.delete('/:id', authMiddleware, validateIdParam, deleteContact);

export default router;