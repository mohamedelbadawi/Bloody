const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/APIError")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const argon = require("argon2");
const { exclude } = require('../utils/helper')


exports.createUser = asyncHandler(async (req, res, next) => {
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
    return res.json({ 'message': "Done", data: data });
})
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({ select: { firstName: true, lastName: true, email: true, phone: true, address: true } });

    return res.json({ 'data': users });
})
exports.getUserById = asyncHandler(async (userId) => {


    const user = await prisma.user.findUnique({
        where: { id: userId }, select: {
            id: true,
            firstName: true, lastName: true,
            email: true, phone: true,
            address: true
        }
    });
    if (!user) {
        return next(new ApiError('there is no user with this id', 404))
    }
    return user;
}
)

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { firstName, lastName, email, password, phone } = req.body
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
        },

    });
    const updatedUser = exclude(user, ['password']);
    return res.status(200).json({ message: "Done", data: updatedUser });

})

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    });
    const deletedUser = exclude(user, ['password'])
    return res.status(200).json({ "message": ":Done", data: deletedUser })
})

exports.getUserByEmail = asyncHandler(async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;

})

exports.getAllUsersWithSameCityAndBloodType = asyncHandler(async (city, bloodTypeId) => {

    const users = await prisma.user.findMany({
        where: {
            AND: [{ address: city }, { bloodTypeId: bloodTypeId }]
        },

    })

    return users;
})