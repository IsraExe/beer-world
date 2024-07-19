import bcrypt from 'bcrypt';
import { badRequestError, unauthorizedError } from '../utils/errorException.js';
import cookiesOptions from '../helpers/cookiesOptions.js';
import createTokens from '../helpers/createTokens.js';

const login = async (req, res, next) => {

    const { email, password } = req.body;

    const host = req.hostname;

    const cookieOptions = cookiesOptions(host);

    if (!email || !password) return next(badRequestError('Email and/or password is missing'));

    const emailUser = email.toLowerCase();

    const user = {
        email: 'visit@beerworld.com.br',
        de_password: '1234',
    }; // logica achar usuário banco de dados;

    if (!user) return next(unauthorizedError('User and/or password invalid'));

    // const isValidPassword = await bcrypt.compare(password, user.de_password);
    const isValidPassword = password === user.de_password;
    if (!isValidPassword) return next(unauthorizedError('User and/or password invalid'));

    const { token } = createTokens(emailUser);

    const { de_password, id_user, ...userDetails } = user;

    res.cookie('token', token, cookieOptions);

    return res.status(200).send({ message: 'Login successfully', token, user: userDetails });

};

export { login };