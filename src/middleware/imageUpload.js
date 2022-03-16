// const multer = require("multer");
// const path = require("path");

// const checkFileType = (file, cb) => {
// 	const fileTypes = /jpg | jpeg | png/;
// 	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
// 	const mimetype = fileTypes.test(file.mimetype);

// 	if (extname && mimetype) {
// 		cb(null, true);
// 	} else {
// 		cb("Image only!", true);
// 	}
// };

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, "uploads/");
// 	},
// 	filename(req, file, cb) {
// 		cb(
// 			null,
// 			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// 		);
// 	},
// });

// module.exports.upload = multer({
// 	storage,
// 	fileFilter: (req, file, cb) => {
// 		checkFileType(file, cb);
// 	},
// });
