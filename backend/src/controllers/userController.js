import bcrypt from 'bcrypt';
import { createUser, updateUser, viewUsers, deleteUser } from '../repositories/userRepository.js';
import verifyReqFields from '../utils/verifyReqFields.js';

const create = async (req, res, next) => {

    const { name, email, password } = req.body;

    verifyReqFields({requiredFields: ['name', 'email', 'password'], fields: req.body});

    const encryptedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, encryptedPassword);

    return res.status(201).send({ message: 'User created' });

};

const update = async (req, res, next) => {

    const { id } = req.metadata;
    const { name, email, password } = req.body;

    verifyReqFields({requiredFields: ['name', 'email', 'password'], fields: req.body});

    const encryptedPassword = await bcrypt.hash(password, 10);

    await updateUser(id, name, email, encryptedPassword);
    
    return res.status(200).send({ message: 'User updated' });

};

const read = async (req, res, next) => {
    
    const users = await viewUsers();

    return res.status(200).send({ message: users });

};

const exclude = async (req, res, next) => {

    const { id } = req.metadata;

    await deleteUser(id);

    const host = req.hostname;
    const domain = host === 'localhost' ? host : host.slice(host.indexOf('.'), host.length);

    res.clearCookie('token', { domain });

    return res.status(204).send({ message: 'User deleted' });

};

export { create, update, read, exclude };