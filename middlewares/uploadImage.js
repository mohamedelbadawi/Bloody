const multer = require("multer");
const ApiError = require('../utils/APIError');


const multerConfig = () => {
    const multerStorage = multer.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        }
        else {
            cb(new ApiError('only images allowed'), false);
        }
    }
    return multer({ storage: multerStorage, fileFilter: multerFilter });
};

exports.uploadSingleImage = () => {
    const upload = multerConfig();
    return upload.single('image');
}
exports.uploadMixImages = (fields) => {
    const upload = multerConfig();
    return upload.fields(fields);
}