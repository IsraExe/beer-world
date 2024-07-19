import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import limiter from './middlewares/limiter.js';

import loginRoutes from './routes/loginRoutes.js'

import { SERVER_PORT, CORS_OPTIONS } from './config/constants.js';

import './scripts/cleanupLogs.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(CORS_OPTIONS));

app.use(limiter);
app.use(logger);

app.use('/login', loginRoutes);

app.use('/', (req, res) => {
    return res.status(200).json({ message: 'Olá, mundo!'})
});

app.use((req, res) => res.status(404).send({ error: 'Not found route' }));

app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));