const express = require("express")

const router = express.Router()
const Product = require("../db/models/product")

// Get all products
router.get("/", async (req, res) => {
	try {
		res.json(await Product.find())
	} catch (e) {
		console.log(e)
	}
})

// Get product by id
// eslint-disable-next-line consistent-return
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)

		if (product) {
			return res.json(product)
		}

		res.status(400).json({ message: "Product Not Found" })
		throw new Error("Product not found")
	} catch (e) {
		console.log(e)
	}
})

module.exports = router
