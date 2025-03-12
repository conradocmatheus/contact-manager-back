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

router.get('/', getAllContacts);
router.get('/by-user/:id', getAllContactsByUserId);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.delete('/all/:id', authMiddleware, deleteAllContactsByUserId);

export default router;