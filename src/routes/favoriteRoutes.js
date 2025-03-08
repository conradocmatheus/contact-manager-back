import express from 'express';
import {getAllFavoriteContacts, addFavoriteContact, getFavoriteContactById, removeFavoriteContact} from '../controllers/favoriteController.js';

const router = express.Router();

router.get('/:userId', getAllFavoriteContacts);
router.post('/', addFavoriteContact);
router.get('/:id', getFavoriteContactById);
router.delete('/:id', removeFavoriteContact);

export default router;
