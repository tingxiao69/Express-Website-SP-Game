const multer = require('multer');
const path = require('path');

// multer related things
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(__dirname);
        callback(null, path.join(__dirname , '../public/user_image/'));
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}`)
    }
});

var upload = multer({
    storage: storage
}).single('image');

module.exports = upload