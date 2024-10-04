// errorHandler.js
export const errorHandler = (err, _req, res, _next) => {
    console.error(err.stack);

    res.status(err.statusCode || 200).json({
        status: false,
        message: err.sqlMessage || err.message|| 'Internal Server Error',
    });
};