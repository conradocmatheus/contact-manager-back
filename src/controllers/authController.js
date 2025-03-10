import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateToken = (userId) => {
    return jwt.sign({userId}, 'chaveSecretaSuperSeguraInvisivelInvencivelGrande', {expiresIn: '1d'});
};