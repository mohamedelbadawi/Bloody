const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/APIError")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.createBloodType = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const data = await prisma.bloodtype.create({
        data: {
            bloodTypeName: name,
        }
    });
    return res.json({ 'message': "Done", data: data });
})

exports.getAllBloodTypes = asyncHandler(async (req, res, next) => {
    const data = await prisma.bloodtype.findMany();
    return res.status(200).json({ message: "Done", data: data });
})


exports.getBloodTypeById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const bloodType = await prisma.bloodtype.findUnique({
        where: { id: id }
    });
    return res.status(200).json({ message: "Done", data: bloodType });
})

exports.updateBLoodType = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { bloodTypeName } = req.body;
    const bloodType = await prisma.bloodtype.update({
        where: {
            id: id
        },
        data: {
            bloodTypeName: bloodTypeName
        }
    });
    return res.status(200).json({ message: "Done", data: bloodType })
})

exports.deleteBloodType = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedBLoodType = await prisma.bloodtype.delete({
        where: {
            id: id
        }
    });

    return res.status(200).json({ message: "done", data: deletedBLoodType });
})

exports.checkBloodTypeById = async (id) => {
    const bloodType = await prisma.bloodtype.findFirst({
        where: {
            id: id
        }
    });
    return bloodType !== null ? true : false
}