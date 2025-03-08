import prisma from "../../prisma/prismaClient.js";
import { asyncHandler } from "../utils/middlewares/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await prisma.user.create({
        data: { name, email, password }
    });

    res.status(201).json(user);
});

export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, password }
    });

    res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
        where: { id: parseInt(id) }
    });

    res.status(204).send();
});