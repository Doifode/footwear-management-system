class ResponseHandler {
    static success(res, message, statusCode, data = {}) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    };

    static error(res, message, statusCode,) {
        return res.status(statusCode).json({
            success: false,
            message,
        });
    };

};

export default ResponseHandler;