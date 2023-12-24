const express = require("express")

const router = express.Router()

const checkObjectId = require("../middleware/checkObjectId")
const { protect, admin } = require("../middleware/auth")
const {
	getProductById,
	createProduct,
	getProducts,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController")

router.route("/").get(getProducts).post(protect, admin, createProduct)
router
	.route("/:id")
	.get(checkObjectId, getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct)

module.exports = router
