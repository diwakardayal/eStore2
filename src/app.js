require("dotenv").config()
const express = require("express")
require("./db/connection")

const app = express()

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running ${process.env.PORT || 3000}`)
})
