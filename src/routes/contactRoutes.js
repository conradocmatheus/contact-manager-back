import { Router } from 'express';
import {getAllContacts} from '../controllers/contactController.js';

const router = new Router();

router.get('/', getAllContacts);