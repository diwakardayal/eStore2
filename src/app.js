/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("./db/connection")
const routerIndex = require("./routes/routerIndex")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(routerIndex)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running ${process.env.PORT || 3000}`)
})
