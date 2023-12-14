const express = require("express")
const productRoutes = require("./product")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoute")

const router = express.Router()

router.use("/api/products", productRoutes)
router.use("/api/users", userRoutes)
router.use("/api/orders", orderRoutes)

router.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

module.exports = router
