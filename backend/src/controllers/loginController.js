import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'

import { badRequestError, unauthorizedError } from '../utils/errorException.js';
import cookiesOptions from '../helpers/cookiesOptions.js';
import createTokens from '../helpers/createTokens.js';

const prisma = new PrismaClient();

const login = async (req, res, next) => {

    const { email, password } = req.body;

    const host = req.hostname;

    const cookieOptions = cookiesOptions(host);

    if (!email || !password) return next(badRequestError('Email and/or password is missing'));

    const emailUser = email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return next(unauthorizedError('User and/or password invalid'));

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return next(unauthorizedError('User and/or password invalid'));

    const { token } = createTokens(emailUser);

    const { password: removePassFromUserInfo, ...userDetails } = user;

    res.cookie('token', token, cookieOptions);

    return res.status(200).send({ message: 'Login successfully', user: userDetails });

};

export { login };