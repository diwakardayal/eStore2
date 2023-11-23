const jwt = require("jsonwebtoken")

const generateAndSetJwtCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	})

	// Set JWT as HTTP Only cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		samesite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	})
}

module.exports = generateAndSetJwtCookie
