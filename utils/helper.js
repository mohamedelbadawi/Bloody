const jwt = require('jsonwebtoken');

exports.exclude = (user, keys) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}

exports.createToken = (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });

    return token;
}