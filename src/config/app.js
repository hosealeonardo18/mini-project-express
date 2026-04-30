require('dotenv').config();

const config = {
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'development',

    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'express_starter',
    },
};

module.exports = config;