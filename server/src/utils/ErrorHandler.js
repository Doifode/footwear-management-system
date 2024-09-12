// errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || 200).json({
        status: false,
        message: err.message || 'Internal Server Error',
    });
};