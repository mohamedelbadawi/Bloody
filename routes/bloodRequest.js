const { makeBloodRequest, getBloodRequest, acceptBloodRequest, updateBloodRequest, cancelBloodRequest } = require('../services/bloodRequest');
const { auth } = require('../middlewares/TokenHandler');
const { bloodRequestValidator } = require('../utils/validators/bloodRequest');
const { IsOwnerOfRequest } = require('../middlewares/middlewares');
const router = require('express').Router();

router.route('/').post(bloodRequestValidator, auth, makeBloodRequest)
router.post('/accept/:id', auth, acceptBloodRequest);
router.post('/cancel/:id', auth, IsOwnerOfRequest, cancelBloodRequest);
router.route('/:id').get(auth, getBloodRequest).patch(auth, IsOwnerOfRequest, updateBloodRequest)

module.exports = router
