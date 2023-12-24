/* eslint-disable no-underscore-dangle */
const User = require("../db/models/user")
const asyncHandler = require("../middleware/asyncHandler")
const generateAndSetJwtCookie = require("../utlis/generateToken")
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
		generateAndSetJwtCookie(res, user._id)
		res.status(200).json({
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
	const { name, email, password } = req.body

	// Check if user exist
	const doesUserExist = await User.findOne({ email })

	if (doesUserExist) {
		res.status(400)
		throw new Error("User already exists")
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		generateAndSetJwtCookie(res, user._id)

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
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
	const user = await User.findById(req.user._id)

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
}

/*
    @desc Update user profile
    @route POST /api/users/profile
    @access Private
*/
const updateUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id)
	console.log("??")

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email

		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()
		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
}

/*
    @desc Get users
    @route Get /api/users
    @access Private/Admin
*/
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find()
	res.status(200).send(users)
})

/*
    @desc Get user by Id
    @route Get /api/users/:id
    @access Private/Admin
*/
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password")

	if (user) {
		res.status(200).send(user)
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

/*
    @desc Delete users
    @route Delete /api/users/:id
    @access Private/Admin
*/
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password")

	if (user) {
		if (user.isAdmin) {
			res.status(400)
			throw new Error("Cannot delete admin user")
		}
		await user.deleteOne({ _id: user._id })
		res.status(200).json({ message: "User deleted succesfully" })
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

/*
    @desc Update user
    @route POST /api/users/:id
    @access Private/Admin
*/
const updateUser = asyncHandler(async (req, res) => {
	const { name, email, isAdmin } = req.body
	const user = await User.findById(req.params.id).select("-password")

	if (user) {
		user.name = name
		user.email = email
		user.isAdmin = Boolean(isAdmin)

		const updatedUser = await user.save()
		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

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
