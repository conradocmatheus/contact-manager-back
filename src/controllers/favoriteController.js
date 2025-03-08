import prisma from "../../prisma/prismaClient.js";
import { asyncHandler } from "../utils/middlewares/asyncHandler.js";

export const getAllFavoriteContacts = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const favoriteContacts = await prisma.favoriteContact.findMany({
        where: { userId: parseInt(userId) },
        include: { contact: true }
    });

    res.status(200).json(favoriteContacts);
});

export const addFavoriteContact = asyncHandler(async (req, res) => {
    const { userId, contactId } = req.body;

    const existingFavorite = await prisma.favoriteContact.findUnique({
        where: {
            userId_contactId: {
                userId: parseInt(userId),
                contactId: parseInt(contactId)
            }
        }
    });

    if (existingFavorite) {
        return res.status(400).json({ error: 'Contact is already in favorites' });
    }

    const favoriteContact = await prisma.favoriteContact.create({
        data: { userId: parseInt(userId), contactId: parseInt(contactId) }
    });

    res.status(201).json(favoriteContact);
});

export const getFavoriteContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const favoriteContact = await prisma.favoriteContact.findUnique({
        where: { id: parseInt(id) },
        include: { contact: true }
    });

    if (!favoriteContact) {
        return res.status(404).json({ error: 'Favorite contact not found' });
    }

    res.status(200).json(favoriteContact);
});

export const removeFavoriteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const favoriteContact = await prisma.favoriteContact.findUnique({
        where: { id: parseInt(id) }
    });

    if (!favoriteContact) {
        return res.status(404).json({ error: 'Favorite contact not found' });
    }

    await prisma.favoriteContact.delete({
        where: { id: parseInt(id) }
    });

    res.status(204).send();
});