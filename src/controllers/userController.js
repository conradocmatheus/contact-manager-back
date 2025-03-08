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