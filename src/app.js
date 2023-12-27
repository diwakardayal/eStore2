/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")

require("./db/connection")
const routerIndex = require("./routes/routerIndex")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express()
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routerIndex)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "/frontend/dist")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname, "..", "/frontend", "dist", "index.html")))
	})
} else {
	app.get("/", (req, res) => {
		res.send("API is running...")
	})
}

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running ${process.env.PORT || 3000}`)
})
