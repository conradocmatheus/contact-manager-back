import { Router } from 'express';
import {createContact, getAllContacts} from '../controllers/contactController.js';

const router = new Router();

router.get('/', getAllContacts);
router.post('/', createContact);