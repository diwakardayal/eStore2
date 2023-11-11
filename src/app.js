require("dotenv").config()
const express = require("express")
require("./db/connection")
const routerIndex = require("./routes/routerIndex")

const app = express()
app.use(routerIndex)

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running ${process.env.PORT || 3000}`)
})
