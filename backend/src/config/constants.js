const FRONTEND_URL = process.env.FRONTEND_URL;

export const SERVER_PORT = process.env.SERVER_PORT;

export const CORS_OPTIONS = {

    origin: [`${FRONTEND_URL}`],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true

};

export const EVERY_DAY_CRON = '0 0 * * *';