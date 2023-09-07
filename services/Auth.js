const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('./user')
const { createToken, exclude } = require('../utils/helper')
const argon = require("argon2");
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/APIError');
const prisma = new PrismaClient();

exports.signup = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, address, password, bloodTypeId } = req.body;
    const hashedPassword = await argon.hash(password)
    const data = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            password: hashedPassword,
            bloodTypeId: bloodTypeId
        },
    });
    const token = createToken(data.id);
    const userDataWithoutPassword = exclude(data, ['password']);
    userDataWithoutPassword.token = token;
    return res.status(200).json({ "Message": "Registration Completed", Data: userDataWithoutPassword });
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user === null) {
        return next(new ApiError("there is no user with this email", 404));
    }
    if (!argon.verify(user.password, password)) {
        return next(new ApiError("the password is incorrect", 401));
    }
    const token = createToken(user.id);
    return res.status(200).json({
        message: "login successfully", data: {
            token: token
        }
    });
})