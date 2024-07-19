import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const createTokens = (email) => {

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

    return { token };

};

export default createTokens;