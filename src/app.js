/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config()
const express = require("express")
const cors = require("cors")

require("./db/connection")
const routerIndex = require("./routes/routerIndex")

const app = express()
app.use(cors({ origin: "*" }))
app.use(routerIndex)

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running ${process.env.PORT || 3000}`)
})
