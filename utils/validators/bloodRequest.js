const { check } = require("express-validator");
const { validator } = require('../../middlewares/validator');
const { checkBloodTypeById } = require("../../services/bloodType");

exports.bloodRequestValidator = [
    check('description').exists().withMessage('description is required').notEmpty().withMessage('description must be not empty'),
    check('bloodTypeId').exists().withMessage('blood type is required').custom(async (val) => {
        if (!checkBloodTypeById(val)) {
            throw new Error('the blood type is not correct')
        }
    }),
    validator
]