import bcrypt from 'bcrypt';
import { badRequestError } from '../utils/errorException.js';

const create = async (req, res, next) => {

    const requiredFields = ['firstName', 'lastName', 'email', 'password'];

    const { firstName, lastName, email, password } = req.body;
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) return next(badRequestError(`Missing required fields: ${missingFields.join(', ')}`));

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = {
        firstName,
        lastName,
        email,
        de_password: encryptedPassword,
    };

    // lógica para salvar no banco de dados;

    return res.status(201).send({ message: 'User created' });

};

export { create };