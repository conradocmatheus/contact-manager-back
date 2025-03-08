import prisma from "../../prisma/prismaClient.js";
import { asyncHandler } from "../utils/middlewares/asyncHandler.js";

export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
});

export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, userId } = req.body;

    const existingContact = await prisma.contact.findUnique({
        where: { email }
    });

    if (existingContact) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const contact = await prisma.contact.create({
        data: { name, email, phone, userId }
    });

    res.status(201).json(contact);
});

export const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
        where: { id: parseInt(id) }
    });

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
});

export const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const contact = await prisma.contact.findUnique({
        where: { id: parseInt(id) }
    });

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedContact = await prisma.contact.update({
        where: { id: parseInt(id) },
        data: { name, email, phone }
    });

    res.status(200).json(updatedContact);
});

export const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
        where: { id: parseInt(id) }
    });

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    await prisma.contact.delete({
        where: { id: parseInt(id) }
    });

    res.status(204).send();
});