import prisma from "../../prisma/prismaClient.js";

export async function getAllUsers(req, res) {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export async function createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password,
            }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}