import checkAuth from '../helpers/checkAuth.js';
import { badRequestError } from '../utils/errorException.js';

const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) return next(badRequestError('No token provided'));
    
    const { login } = await checkAuth(token);

    req.metadata = { login };

    return next();

};

export default auth;