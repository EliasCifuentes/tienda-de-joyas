export const logger = (req, res, next) => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;

    console.table({
        Fecha: now,
        Método: method,
        Ruta: url,
        IP: ip
    });

    next();
};
