import writeLogFile from '../utils/writeLogFile.js';

const errorHandler = async (error, req, res, next) => {

    res.on('finish', () => writeLogFile(req, res, error));

    if (error.code === 'ENOENT') return res.status(404).send({ error: `Not found folder or file ${error.path}` });
    
    const statusCode = error?.statusCode || 500;
    const messageError = error?.statusCode ? error?.message : 'Server internal error';


    return res.status(statusCode).send({ error: messageError });

};

export default errorHandler;