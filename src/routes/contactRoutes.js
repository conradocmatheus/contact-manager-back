import { Router } from 'express';
import {
    createContact,
    deleteContact,
    getAllContacts,
    getAllContactsByUserId,
    getContactById,
    updateContact
} from '../controllers/contactController.js';

const router = new Router();

router.get('/', getAllContacts);
router.get('/by-user/:id', getAllContactsByUserId);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;