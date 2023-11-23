const jwt = require("jsonwebtoken")
const User = require("../db/models/user")
const asyncHandler = require("../middleware/asyncHandler")
/*
    @desc Auth user & get token
    @route GET /api/users/login
    @access Public

*/
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		// eslint-disable-next-line no-underscore-dangle
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		})

		console.log(token)

		// Set JWT as HTTP Only cookie
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			samesite: "strict",
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
		})

		res.json({
			// eslint-disable-next-line no-underscore-dangle
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error("Invalid email or password")
	}
})

/*
    @desc Register user
    @route POST /api/users
    @access Public

*/
const registerUser = async (req, res) => {
	res.send("register user")
}

/*
    @desc Logout user & clear cookie
    @route POST /api/users/logout
    @access Private
*/
const logoutUser = async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	})
	res.status(200).json({ message: "Logged out successfully" })
}

/*
    @desc Get user profile
    @route POST /api/users/profile
    @access Public
*/
const getUserProfile = async (req, res) => {
	res.send("get user profile")
}

/*
    @desc Update user profile
    @route POST /api/users/profile
    @access Private
*/
const updateUserProfile = async (req, res) => {
	res.send("update user profile")
}

/*
    @desc Get users
    @route Get /api/users
    @access Private/Admin
*/
const getUsers = async (req, res) => {
	res.send("get user")
}

/*
    @desc Get user by Id
    @route Get /api/users/:id
    @access Private/Admin
*/
const getUserById = async (req, res) => {
	res.send("get user by id")
}

/*
    @desc Delete users
    @route Delete /api/users/:id
    @access Private/Admin
*/
const deleteUser = async (req, res) => {
	res.send("delete user")
}

/*
    @desc Update user
    @route POST /api/users/:id
    @access Private/Admin
*/
const updateUser = async (req, res) => {
	res.send("update user")
}

module.exports = {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser,
}
