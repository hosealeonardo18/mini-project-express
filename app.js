const express = require('express');
const routes = require('./src/routes/');
const errorHandler = require('./src/middleware/errorHandler');
const notFound = require('./src/middleware/notFound');


const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use(notFound);

// ─── Error Handler ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
