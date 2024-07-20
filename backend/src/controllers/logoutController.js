const logout = async (req, res, next) => {

    const host = req.hostname;
    const domain = host === 'localhost' ? host : host.slice(host.indexOf('.'), host.length);

    res.clearCookie('token', { domain });

    return res.status(200).send({ message: 'Cookies cleared. Logout successfully' });

};

export { logout };