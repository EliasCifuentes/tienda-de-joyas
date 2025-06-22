export const errorHandler = (err, req, res, next) => {
    console.error('Error capturado por middleware:', err.message || err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({ error: message })
}