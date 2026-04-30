require('dotenv').config();
const app = require('./app');
const config = require('./src/config/app');
const db = require('./src/db');

const start = async () => {
    try {
        await db.raw('SELECT 1');
        console.log('Database connected.');

        app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`);
            console.log(`Environment: ${config.env}`);
        });
    } catch (err) {
        console.error('Gagal start server:', err.message);
        process.exit(1);
    }
};

start();
