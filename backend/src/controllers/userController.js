import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'

import { badRequestError } from '../utils/errorException.js';

const prisma = new PrismaClient();

const create = async (req, res, next) => {

    const requiredFields = ['name', 'email', 'password'];

    const { name, email, password } = req.body;

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) return next(badRequestError(`Missing required fields: ${missingFields.join(', ')}`));

    const encryptedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: encryptedPassword
        },
    });

    return res.status(201).send({ message: 'User created' });

};

export { create };