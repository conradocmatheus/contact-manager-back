import { Router } from 'express';
import {createContact, deleteContact, getAllContacts, getContactById, updateContact} from '../controllers/contactController.js';

const router = new Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;