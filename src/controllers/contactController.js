import prisma from "../../prisma/prismaClient.js";
import { asyncHandler } from "../utils/middlewares/asyncHandler.js";

export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
});