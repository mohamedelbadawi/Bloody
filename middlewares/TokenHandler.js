const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/APIError');
const { getUserById } = require('../services/user')

exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError("you are not allowed to access this route"));
    }
    next();
})


exports.auth = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError("you must be logged in ", 401));
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if user exists
    const user = await getUserById(userData.userId);
    if (!user) {
        return next(new ApiError("this user does not exist", 401));
    }
    req.user = user;

    next();
})