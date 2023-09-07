const router = require('express').Router();
const { signup, login } = require("../services/Auth");
const { signupValidator, loginValidator } = require('../utils/validators/auth');

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
module.exports = router;