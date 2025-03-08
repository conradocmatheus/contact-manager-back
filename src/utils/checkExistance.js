import prisma from '../../prisma/prismaClient.js';

export const checkExistance = async (model, criteria) => {
    try {
        const record = await prisma[model].findUnique({
            where: criteria
        });
        return record !== null;
    } catch (error) {
        console.error('Error checking existence:', error);
        throw new Error('Error checking existence');
    }
};