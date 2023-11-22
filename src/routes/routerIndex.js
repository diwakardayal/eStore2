const express = require("express")
const productRoutes = require("./product")
const userRoutes = require("./userRoutes")

const router = express.Router()

router.use("/api/products", productRoutes)
router.use("/api/users", userRoutes)

module.exports = router
