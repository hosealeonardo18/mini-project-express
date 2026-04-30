const AppError = require('../utils/AppError');

const handleDbError = (err) => {
    if (err.code === 'ER_DUP_ENTRY') {
        return new AppError('Data sudah ada / duplicate entry.', 409);
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return new AppError('Referensi data tidak ditemukan.', 400);
    }
    return null;
};

const handleJwtError = (err) => {
    if (err.name === 'JsonWebTokenError') return new AppError('Token tidak valid.', 401);
    if (err.name === 'TokenExpiredError') return new AppError('Token sudah expired.', 401);
    return null;
};

const sendError = (err, res) => {
    const isDev = process.env.APP_ENV === 'development';

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(isDev && { stack: err.stack }),
        });
    }

    console.error('UNEXPECTED ERROR:', err);
    return res.status(500).json({
        success: false,
        message: isDev ? err.message : 'Terjadi kesalahan pada server.',
        ...(isDev && { stack: err.stack }),
    });
};

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    const dbError = handleDbError(err);
    if (dbError) return sendError(dbError, res);

    const jwtError = handleJwtError(err);
    if (jwtError) return sendError(jwtError, res);

    sendError(err, res);
};

module.exports = errorHandler;