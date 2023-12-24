/* eslint-disable import/no-extraneous-dependencies */
const path = require("path")
const express = require("express")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/")
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
	},
})

function checkFileType(file, cb) {
	const fileTypes = /jpg|jpeg|png/
	const extname = fileTypes.test(path.extname(file.originalname)).toLowerCase()
	const mimeType = fileTypes.test(file.mimetype)
	if (extname && mimeType) {
		cb(null, true)
	} else {
		cb(new Error("Images only!"), false)
	}
}

const upload = multer({
	storage,
	checkFileType,
})

router.post("/", upload.single("image"), (req, res) => {
	res.status(200).send({
		message: "Image Uploaded",
		image: `/${req.file.path}`,
	})
})
module.exports = router
