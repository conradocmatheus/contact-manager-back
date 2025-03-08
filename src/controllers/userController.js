import prisma from "../../prisma/prismaClient.js";

export async function getAllUsers(req, res) {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error});
    }
}