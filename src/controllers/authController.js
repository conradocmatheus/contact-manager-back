import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { asyncHandler } from '../utils/middlewares/asyncHandler.js';

const prisma = new PrismaClient();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    const token = generateToken(user.id);

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken(user.id);

    res.status(200).json({ token, user: { id: user.id, email, name: user.name } });
});
