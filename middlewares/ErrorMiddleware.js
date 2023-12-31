
const ApiError = require("../utils/APIError");

const globalError = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({ status: err.status, error: err, message: err.message, stack: err.stack })
    }
    else {
        if (err.name === 'JsonWebTokenError') {
            return new ApiError('Invalid token , please try to login again', 401);
        }
        if (err.name === 'TokenExpiredError') {
            return new ApiError('Expired token , please login again', 401);
        }

        return res.status(err.statusCode).json({ status: err.status, message: err.message });
    }
}

module.exports = globalError;