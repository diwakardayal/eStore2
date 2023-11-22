const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	// eslint-disable-next-line no-return-await
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("users", userSchema)
