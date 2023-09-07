const { check } = require('express-validator');

exports.createNewBloodTypeValidator = [
    check('name').exists().withMessage("please provide a name of blood type").notEmpty().custom(async(name))
]