const { check } = require('express-validator');
const { checkBloodTypeById } = require('../../services/bloodType');

const { validator } = require('../../middlewares/validator');
const { getUserByEmail } = require('../../services/user');
exports.signupValidator = [
    check('firstName').exists().withMessage('First name is required').isLength({
        min: 3, max: 32
    }).withMessage('first name must at least 3 chars and at most 32 chars'),

    check('lastName').exists().withMessage('last name is required').isLength({
        min: 3, max: 32
    }).withMessage('last name must at least 3 chars and at most 32 chars'),
    check('phone').exists().withMessage('phone is required').isMobilePhone("ar-EG"),
    check('password').exists().withMessage("password is required").isLength({ min: 8, max: 20 }).withMessage("password must contains at least 8 letters"),
    check('address').exists().withMessage("address is required").notEmpty().withMessage("address must be not empty"),

    check('email').exists().withMessage('email is required').isEmail().withMessage("this email is invalid ").custom(async (email) => {
        // check if the email is exists
        if (getUserByEmail(email) != null) {
            throw new Error('please try again with another email')
        }
    }),
    check('bloodTypeId').exists().withMessage("blood type is required").notEmpty().withMessage('blood type is not correct').custom(async (val) => {
        if (!await checkBloodTypeById(val)) {
            throw new Error('blood type is not correct');
        }
    }),
    validator

];

exports.loginValidator = [
    check("email").exists().withMessage("email is required").isEmail().withMessage('please provide a valid email'),
    check('password').exists().withMessage("password is required").isLength({ min: 8, max: 20 }).withMessage("password must contains at least 8 letters"),
    validator
]