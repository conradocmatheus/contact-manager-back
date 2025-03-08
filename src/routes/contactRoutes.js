import { Router } from 'express';
import {createContact, deleteContact, getAllContacts, getContactById, updateContact} from '../controllers/contactController.js';

const router = new Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

export default router;