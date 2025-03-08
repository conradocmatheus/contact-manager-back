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