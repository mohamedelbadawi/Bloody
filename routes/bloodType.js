const router = require('express').Router();
const { createBloodType, getAllBloodTypes, getBloodTypeById, updateBLoodType, deleteBloodType } = require('../services/bloodType');


router.route('/').post(createBloodType).get(getAllBloodTypes);
router.route('/:id').get(getBloodTypeById).patch(updateBLoodType).delete(deleteBloodType)
module.exports = router;
