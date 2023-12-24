/* eslint-disable no-underscore-dangle */
const path = require("path")
const express = require("express")
const productRoutes = require("./product")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoute")
const uploadroute = require("./uploadRoute")

const router = express.Router()

router.use("/api/products", productRoutes)
router.use("/api/users", userRoutes)
router.use("/api/orders", orderRoutes)
router.use("/api/upload", uploadroute)

router.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

router.use("/uploads", express.static(path.join(__dirname, "../..", "/uploads")))

module.exports = router
