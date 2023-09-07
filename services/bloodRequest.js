const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client');
const { getAllUsersWithSameCityAndBloodType } = require('./user');
const prisma = new PrismaClient();

const myQueue = require('../utils/jobQueue')

exports.makeBloodRequest = asyncHandler(async (req, res, next) => {
    // must be logged in 
    const { description, bloodTypeId } = req.body;

    const bloodRequest = await prisma.bloodRequest.create({
        data: {

            description: description,
            receiverId: req.user.id,
            bloodTypeId: bloodTypeId
        }
    });
    // get all that in the same city
    const data = {
        address: req.user.address,
        bloodType: bloodRequest.bloodTypeId,
        requesterName: `${req.user.firstName} ${req.user.lastName}`,
        requestId: bloodRequest.id
    }
    console.log(data)
    await myQueue.add({
        type: 'sendEmailsForALLUsersThatHaveTheSameCityAndBloodType',
        data: data
    });

    return res.status(200).json({ message: "request sent successfully", data: bloodRequest });


})

exports.getBloodRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const bloodRequest = this.getBloodRequestById(id);
    return res.status(200).json({ data: bloodRequest })
})

exports.acceptBloodRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const bloodRequest = await prisma.bloodRequest.update({
        where: {
            id: id
        },
        data: {
            status: 'completed',
            donorById: req.user.id,
            donationCompletedAt: new Date(),

        },
        include: {
            receiver: true
        }

    });

    const options = {
        "email": bloodRequest.receiver.email,
        "subject": `we found a donor for you`,
        "message": `Hello ${bloodRequest.receiver.firstName} ${bloodRequest.receiver.lastName} , Hope you are doing well ,
       we found a donor for you can contact him via phone (${req.user.phone})`
    }

    await myQueue.add({
        type: 'sendEmail',
        data: { options: options }
    })
    return res.status(200).json({ "message": "Done" });

})

exports.updateBloodRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { description, bloodTypeId } = req.body;

    const bloodRequest = await prisma.bloodRequest.update({
        where: {
            id: id
        }, data: {
            description: description,
            bloodTypeId: bloodTypeId
        }
    });
    return res.status(200).json({ "Message": "updated successfully", data: bloodRequest })
})

exports.getBloodRequestById = asyncHandler(async (id) => {
    const bloodRequest = await prisma.bloodRequest.findUnique({
        where: {
            id: id
        }
    });
    return bloodRequest;
})

exports.cancelBloodRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const bloodRequest = await prisma.bloodRequest.update({
        where: {
            id: id
        }, data: {
            status: 'canceled',
        }
    });
    return res.status(200).json({ "message": "request canceled ", data: bloodRequest })
})