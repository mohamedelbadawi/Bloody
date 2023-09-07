const router = require('express').Router();
const { auth } = require('../middlewares/TokenHandler');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../services/user');
const { signupValidator } = require('../utils/validators/auth')
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).patch(auth, updateUser).delete(auth,deleteUser);

module.exports = router;