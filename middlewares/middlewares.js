const { prisma } = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const { getBloodRequest, getBloodRequestById } = require('../services/bloodRequest');

exports.IsOwnerOfRequest = asyncHandler(async (req, res, next) => {
    const bloodRequest = await getBloodRequestById(req.params.id);
    console.log(req.user.id)
    console.log(bloodRequest)
    if (!(req.user.id === bloodRequest.receiverId)) {
        throw new Error("you dan't have permission to update this request")
    }
    next();
})