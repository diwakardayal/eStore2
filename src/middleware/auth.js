const jwt = require("jsonwebtoken")
const asyncHandler = require("./asyncHandler")
const User = require("../db/models/user")

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
	let token

	// Read the token from the browser
	token = req?.cookies?.jwt
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.userId).select("-password")
			next()
		} catch (e) {
			console.log(e)
			res.status(401)
			throw new Error("Not Authorized, token failed")
		}
	} else {
		res.status(401)
		throw new Error("Not Authorized, no token")
	}
})

// Admin middlware
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error("Not Authorized as admin")
	}
}

module.exports = { protect, admin }
