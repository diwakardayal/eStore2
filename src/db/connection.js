const mongoose = require("mongoose")

try {
	mongoose
		.connect(process.env.MONGODB_CONNECTION_URL)
		.then(() => console.log("Connection to the db established"))
} catch (e) {
	console.log(e)
}
