const logout = async (req, res, next) => {

    const host = req.hostname;
    const domain = host === 'localhost' ? host : '.onrender.com';

    res.clearCookie('token', { domain });

    return res.status(200).send({ message: 'Cookies cleared. Logout successfully' });

};

export { logout };