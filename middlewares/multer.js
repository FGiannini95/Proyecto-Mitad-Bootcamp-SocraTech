const multer = require('multer');

const uploadImage = (folderName) => {

    const storage = multer.diskStorage({
        destination: `public/images/${folderName}`,
        filename: function (req, file, cb){
            let nombreOriginal = file.originalname;
            let extension = nombreOriginal.slice(nombreOriginal.lastIndexOf(".", nombreOriginal.length))
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + extension )
        }
    }
    )
    const upload = multer({ storage: storage }).single("img");
    return upload;
}

module.exports = uploadImage;