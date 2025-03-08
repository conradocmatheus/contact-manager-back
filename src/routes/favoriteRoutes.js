import express from 'express';
import {getAllFavoriteContacts, addFavoriteContact, getFavoriteContactById, removeFavoriteContact} from '../controllers/favoriteController.js';

const router = express.Router();

router.get('/:userId/favorites', getAllFavoriteContacts);
router.post('/favorites', addFavoriteContact);
router.get('/favorites/:id', getFavoriteContactById);
router.delete('/favorites/:id', removeFavoriteContact);

export default router;
